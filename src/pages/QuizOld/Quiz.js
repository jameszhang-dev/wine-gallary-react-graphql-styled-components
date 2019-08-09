import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { GET_MEMBER, GET_QUIZ_QUESTIONS, GET_REFERRAL_DISCOUNT } from '../../graphql/queries';
import { SUBMIT_QUIZ } from '../../graphql/mutations';
import { SET_MEMBER_AUTH } from '../../graphql/resolvers/auth';
import { SET_REFERRAL_DISCOUNT } from '../../graphql/resolvers/member';
import {
  FETCH_POLICY_CACHE_ONLY,
  DB_IDS_QUIZ_VERSION,
  DB_IDS_QUIZ_ANSWER_WITH_VERSION,
  DB_IDS_QUIZ_QUESTION_WITH_VERSION,
  DB_IDS_QUIZ_QUESTION_WITH_WINE_QUANTITY,
  DB_IDS_QUIZ_QUESTION_WITH_PRICE_POINT,
  WINE_CLASS_IDS,
  DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY,
} from '../../helpers/constants';
import { wait } from '../../helpers/tools';
import { checkEmail } from '../../helpers/validations';
import { isLoggedIn, setLocalStorageToken } from '../../helpers/auth';
import urlPatterns from '../../urls';
import { InputField, QuizQuestion, WineQuantityQuizQuestion } from '../../components';

import './Quiz.scss';

/**
 * Renders Quiz component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Quiz extends Component {
  static propTypes = {
    setMemberAuth: PropTypes.func.isRequired,
    submitQuiz: PropTypes.func.isRequired,
    referralDiscountQuery: PropTypes.shape({}).isRequired,
    setReferralDiscount: PropTypes.func.isRequired,
    meQuery: PropTypes.shape({}).isRequired,
    allQuizQuestionsQuery: PropTypes.shape({}).isRequired,
  };

  state = {
    selectedAnswers: {}, // eg. { questionId: [selectedAnswer1, selectedAnswer2] }
    email: null,
    memberName: null,
    quizVersion: DB_IDS_QUIZ_VERSION.SIMPLE_QUIZ,
    currentQuestionIndex: 0, // Refers to sortIndex
    redBottles: 0,
    whiteBottles: 0,
    sparklingBottles: 0,
    roseBottles: 0,
    blacklistedQuestions: [], // List of IDs of questions to be hidden (eg. for Gift receivers)
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextMeQuery = nextProps.meQuery;

    const answerIdsFromProps = nextMeQuery.me && nextMeQuery.me.quizAnswers.map(answer => answer.id);
    const answerIdsFromState = Object.values(prevState.selectedAnswers).flat();

    const areAnswersUpdated = nextMeQuery.me && answerIdsFromState.length === 0 && answerIdsFromProps.length;
    const areMemberDetailsUpdated = nextMeQuery.me && nextMeQuery.me.email !== prevState.email;

    // Updates state with props only when new answers on initial load of meQuery are received
    if (isLoggedIn() && (areAnswersUpdated || areMemberDetailsUpdated)) {

      // Gets Member answers from the backend
      const memberAnswers = {};
      nextMeQuery.me.quizAnswers.forEach(quizAnswer => {
        const currentAnswers = memberAnswers[quizAnswer.quizQuestion.id] || [];
        memberAnswers[quizAnswer.quizQuestion.id] = [...currentAnswers, quizAnswer.id];
      });

      // Gets Member Wine Quantities from the backend
      const memberWineQuantities = {};
      nextMeQuery.me.winequantitySet.forEach(wineQuantity => {
        const currentWineQuantities = memberWineQuantities[wineQuantity.wineClass.id] || 0;
        memberWineQuantities[wineQuantity.wineClass.id] = (
          currentWineQuantities + wineQuantity.numberOfBottles
        );
      });

      // Gift receivers shouldn't see questions with Price Points and Wine Quantities
      const isGiftReceiver = nextMeQuery.me.hasPendingGift || nextMeQuery.me.hasActiveGift;
      const blacklistedQuestions = isGiftReceiver
        ? [
          ...Object.values(DB_IDS_QUIZ_QUESTION_WITH_PRICE_POINT),
          ...Object.values(DB_IDS_QUIZ_QUESTION_WITH_WINE_QUANTITY),
        ]
        : [];

      return {
        email: nextMeQuery.me.email,
        currentQuestionIndex: 1,
        memberName: nextMeQuery.me.firstName,
        selectedAnswers: memberAnswers,
        quizVersion: DB_IDS_QUIZ_QUESTION_WITH_VERSION.ADVANCED_QUIZ in memberAnswers
          ? DB_IDS_QUIZ_VERSION.ADVANCED_QUIZ
          : DB_IDS_QUIZ_VERSION.SIMPLE_QUIZ,
        redBottles: memberWineQuantities[WINE_CLASS_IDS.DB_ID_WINE_CLASS_RED] || 0,
        whiteBottles: memberWineQuantities[WINE_CLASS_IDS.DB_ID_WINE_CLASS_WHITE] || 0,
        sparklingBottles: memberWineQuantities[WINE_CLASS_IDS.DB_ID_WINE_CLASS_SPARKLING] || 0,
        roseBottles: memberWineQuantities[WINE_CLASS_IDS.DB_ID_WINE_CLASS_ROSE] || 0,
        blacklistedQuestions,
      };
    }
    return null;
  }

  /**
   * Handles selection of an answer.
   *
   * @param {Number} questionID
   * @param {Number} maxAnswers
   * @param {Array} selectedAnswersIDs
   * @param {Number} sortOrder
   */
  handleAnswerSelect = (questionID, maxAnswers, selectedAnswersIDs, sortOrder) => {
    const { selectedAnswers } = this.state;

    const advancedQuizChosenIds = [
      DB_IDS_QUIZ_ANSWER_WITH_VERSION.SIMPLE_QUIZ.ADVANCED,
      DB_IDS_QUIZ_ANSWER_WITH_VERSION.ADVANCED_QUIZ.ADVANCED,
    ];
    const simpleQuizChosenByBeginnerIds = [
      DB_IDS_QUIZ_ANSWER_WITH_VERSION.SIMPLE_QUIZ.BEGINNER,
      DB_IDS_QUIZ_ANSWER_WITH_VERSION.ADVANCED_QUIZ.BEGINNER,
    ];
    const simpleQuizChosenByRegularIds = [
      DB_IDS_QUIZ_ANSWER_WITH_VERSION.SIMPLE_QUIZ.REGULAR,
      DB_IDS_QUIZ_ANSWER_WITH_VERSION.ADVANCED_QUIZ.REGULAR,
    ];

    // Logic required to switch variant of the Quiz, which requires
    if (selectedAnswersIDs.some(id => advancedQuizChosenIds.includes(id))) {

      // When user changes from Simple to Advanced version
      this.switchQuizVersion(
        DB_IDS_QUIZ_VERSION.ADVANCED_QUIZ,
        sortOrder,
        DB_IDS_QUIZ_ANSWER_WITH_VERSION.ADVANCED_QUIZ.ADVANCED,
      );
    } else if (selectedAnswersIDs.some(id => simpleQuizChosenByBeginnerIds.includes(id))) {

      // When user changes from Advanced to Simple version (beginner)
      this.switchQuizVersion(
        DB_IDS_QUIZ_VERSION.SIMPLE_QUIZ,
        sortOrder,
        DB_IDS_QUIZ_ANSWER_WITH_VERSION.SIMPLE_QUIZ.BEGINNER,
      );
    } else if (selectedAnswersIDs.some(id => simpleQuizChosenByRegularIds.includes(id))) {

      // When user changes from Advanced to Simple version (regular)
      this.switchQuizVersion(
        DB_IDS_QUIZ_VERSION.SIMPLE_QUIZ,
        sortOrder,
        DB_IDS_QUIZ_ANSWER_WITH_VERSION.SIMPLE_QUIZ.REGULAR,
      );
    } else {
      const moveToNextQuestion = selectedAnswersIDs.length === maxAnswers;
      this.setState({
        selectedAnswers: { ...selectedAnswers, [questionID]: selectedAnswersIDs },
      });
      moveToNextQuestion && this.navigateToTheNextPage();
    }
  };

  /**
   * Handles submitting the Quiz. Sends the mutation to the API.
   */
  handleSubmitQuiz = () => {
    const {
      setMemberAuth, submitQuiz, referralDiscountQuery, setReferralDiscount, meQuery,
    } = this.props;
    const {
      selectedAnswers, email, memberName, redBottles, whiteBottles, sparklingBottles, roseBottles,
    } = this.state;
    const selectedAnswersAsArray = Object.values(selectedAnswers).flat();

    // Auth data required for user authentication
    const authData = {
      clientId: `${process.env.REACT_APP_CLIENT_ID}`,
      clientSecret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    };

    // Gets referral and giveaway codes from apollo-link-state
    const { referralCode, giveawayCode } = referralDiscountQuery.referralDiscount;

    submitQuiz(
      {
        variables: {
          input: {
            answersIds: selectedAnswersAsArray,
            firstName: memberName,
            email,
            redBottles,
            whiteBottles,
            sparklingBottles,
            roseBottles,
            referralCode,
            giveawayCode,
            ...authData,
          },
        },
      }
    ).then(
      async ({ data }) => {
        if (data && data.submitQuiz.isSuccessful && data.submitQuiz.accessToken) {

          // Removes referral discount from the apollo-link-state as it's been saved in the database
          // by the submitQuiz mutation
          await setReferralDiscount({
            variables: {
              referralCode: null,
              giveawayCode: null,
            },
          });

          await setMemberAuth({
            variables: {
              memberId: data.submitQuiz.memberId,
              token: localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE),
            },
          })
            .catch(errorMutation => {
              console.error(errorMutation);
            });

          await setLocalStorageToken(
            data.submitQuiz.accessToken, data.submitQuiz.refreshToken, email,
          );

          // Navigates to the Quiz Results page for new users
          window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.QUIZ_RESULTS}`;

        } else if (data && data.submitQuiz.isSuccessful && meQuery.me.hasPendingGift) {

          // Navigates to the Quiz Results page for Members redeeming a Gift
          window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.QUIZ_RESULTS}`;
        } else if (data && data.submitQuiz.isSuccessful && isLoggedIn()) {

          // Navigates to the Dashboard for logged users
          window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.DASHBOARD}`;
        }
      }
    );
  };

  /**
   * Triggered when user chooses different variant of the Quiz. Different Quiz Answers have to bet set
   * in such case.
   *
   * @param quizVersion
   * @param sortOrder
   * @param newAnswerId
   */
  switchQuizVersion = (quizVersion, sortOrder, newAnswerId) => {

    // Resets all the answers after changing the Quiz Version
    const newAnswers = {};

    // Sets Quiz Answers related to a specific version, it's required as long as there is the same question
    // related to the Quiz Version in the API.
    if (quizVersion === DB_IDS_QUIZ_VERSION.ADVANCED_QUIZ) {
      delete newAnswers[DB_IDS_QUIZ_QUESTION_WITH_VERSION.SIMPLE_QUIZ];
      newAnswers[DB_IDS_QUIZ_QUESTION_WITH_VERSION.ADVANCED_QUIZ] = [newAnswerId];
    } else if (quizVersion === DB_IDS_QUIZ_VERSION.SIMPLE_QUIZ) {
      delete newAnswers[DB_IDS_QUIZ_QUESTION_WITH_VERSION.ADVANCED_QUIZ];
      newAnswers[DB_IDS_QUIZ_QUESTION_WITH_VERSION.SIMPLE_QUIZ] = [newAnswerId];
    }

    // Resets Wine Quantities as well to simplify the logic
    this.setState({
      quizVersion,
      selectedAnswers: newAnswers,
      redBottles: 0,
      whiteBottles: 0,
      roseBottles: 0,
      sparklingBottles: 0,
    }, this.navigateToTheNextPage);
  };

  /**
   * Updates the state with proper number of bottles. Executes updateWineQuantityAnswer as a callback.
   *
   * @param {String} field
   * @param {String} name
   */
  handleUpdateWineQuantity = (field, name) => {
    this.setState({ [field]: name }, this.updateWineQuantityAnswer);
  };

  /**
   * Updates Quiz Answers related to Wine Quantities. Besides storing redBottles, whiteBottles, etc. we have
   * to choose proper answers in the Quiz, such as 'All reds', 'All whites', etc.
   */
  updateWineQuantityAnswer = () => {
    const {
      selectedAnswers,
      redBottles,
      whiteBottles,
      sparklingBottles,
      roseBottles,
      quizVersion,
    } = this.state;

    const isBasicQuizVersion = quizVersion === DB_IDS_QUIZ_VERSION.SIMPLE_QUIZ;
    const questionID = isBasicQuizVersion
      ? DB_IDS_QUIZ_QUESTION_WITH_WINE_QUANTITY.SIMPLE_QUIZ
      : DB_IDS_QUIZ_QUESTION_WITH_WINE_QUANTITY.ADVANCED_QUIZ;

    let selectedAnswersIDs = [];
    const totalBottles = this.getTotalBottles();

    if (totalBottles !== 3) {
      // No answer should be chosen if there are not enough bottles chosen
      selectedAnswersIDs = [];
    } else if (redBottles === 3) { // All reds
      selectedAnswersIDs = isBasicQuizVersion
        ? [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.SIMPLE_QUIZ.ALL_REDS]
        : [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.ADVANCED_QUIZ.ALL_REDS];
    } else if (whiteBottles === 3) { // All whites
      selectedAnswersIDs = isBasicQuizVersion
        ? [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.SIMPLE_QUIZ.ALL_WHITES]
        : [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.ADVANCED_QUIZ.ALL_WHITES];
    } else if (roseBottles === 3) { // All roses
      selectedAnswersIDs = isBasicQuizVersion
        ? [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.SIMPLE_QUIZ.ALL_ROSES]
        : [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.ADVANCED_QUIZ.ALL_ROSES];
    } else if (sparklingBottles === 3) { // All sparklings
      selectedAnswersIDs = isBasicQuizVersion
        ? [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.SIMPLE_QUIZ.ALL_SPARKLINGS]
        : [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.ADVANCED_QUIZ.ALL_SPARKLINGS];
    } else { // Mixed
      selectedAnswersIDs = isBasicQuizVersion
        ? [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.SIMPLE_QUIZ.MIXED]
        : [DB_IDS_QUIZ_ANSWER_WITH_WINE_QUANTITY.ADVANCED_QUIZ.MIXED];
    }

    this.setState({
      selectedAnswers: { ...selectedAnswers, [questionID]: selectedAnswersIDs },
    });
  };

  /**
   * Returns total number of bottles selected.
   *
   * @returns {number}
   */
  getTotalBottles = () => {
    const {
      redBottles, whiteBottles, sparklingBottles, roseBottles,
    } = this.state;
    return redBottles + whiteBottles + sparklingBottles + roseBottles;
  };

  /**
   * Returns Quiz Question valid for current Member.
   *
   * @returns {Array}
   */
  getAllQuizQuestions = () => {
    const { quizVersion, blacklistedQuestions } = this.state;
    const { allQuizQuestionsQuery } = this.props;
    return allQuizQuestionsQuery.allQuizQuestions.filter(
      question => question.quizVersion.id === quizVersion && !blacklistedQuestions.includes(question.id)
    ).sort(
      (a, b) => b.sortOrder > a.sortOrder
    );
  };

  /**
   * Navigates to the next page with delay.
   */
  navigateToTheNextPage() {
    const { state } = this;
    const { quizVersion } = state;
    const allQuizQuestions = this.getAllQuizQuestions();

    const nextQuestion = allQuizQuestions.filter(
      question => question.quizVersion.id === quizVersion && question.sortOrder > state.currentQuestionIndex
    )[0];

    const nextQuestionIndex = nextQuestion ? nextQuestion.sortOrder : state.currentQuestionIndex + 1;

    wait(200).then(() => this.setState({
      currentQuestionIndex: nextQuestionIndex,
    }));
  }

  /**
   * Navigates to the previous page.
   */
  navigateToThePreviousPage() {
    const { state } = this;
    const { quizVersion, currentQuestionIndex } = state;
    const allQuizQuestions = this.getAllQuizQuestions();

    const [previousQuestion] = allQuizQuestions.filter(
      question => question.quizVersion.id === quizVersion && question.sortOrder < currentQuestionIndex
    ).slice(-1);

    this.setState({
      currentQuestionIndex: previousQuestion.sortOrder,
    });
  }

  /**
   * Renders Quiz Question.
   *
   * @returns {*}
   */
  renderCurrentQuizQuestion = () => {
    const {
      selectedAnswers, currentQuestionIndex, memberName, redBottles, whiteBottles, sparklingBottles,
      roseBottles, quizVersion,
    } = this.state;
    const allQuizQuestions = this.getAllQuizQuestions();

    // Filters questions with current quizVersion and sortOrder
    const filteredQuestions = allQuizQuestions.filter(
      question => question.quizVersion.id === quizVersion && question.sortOrder === currentQuestionIndex
    );

    // Validates if there's only one question filtered
    filteredQuestions.length > 2 && console.error('Two questions with the same sortOrder.');
    const currentQuestion = filteredQuestions[0];

    // Returns null if no Quiz Question found- end of the Quiz
    if (currentQuestion === undefined) { return null; }

    // Renders question with WineQuantity which renders different component
    if ([
      DB_IDS_QUIZ_QUESTION_WITH_WINE_QUANTITY.SIMPLE_QUIZ,
      DB_IDS_QUIZ_QUESTION_WITH_WINE_QUANTITY.ADVANCED_QUIZ,
    ].includes(currentQuestion.id)) {
      return (
        <WineQuantityQuizQuestion
          key={currentQuestion.id}
          question={currentQuestion.description.replace('{name}', memberName)}
          answers={currentQuestion.quizanswerSet}
          maxAnswers={currentQuestion.maxAnswers}
          selectedAnswers={selectedAnswers[currentQuestion.id] || []}
          handleAnswerSelectParent={this.handleAnswerSelect}
          handleUpdateWineQuantity={this.handleUpdateWineQuantity}
          questionId={currentQuestion.id}
          sortOrder={currentQuestion.sortOrder}
          redBottles={redBottles}
          whiteBottles={whiteBottles}
          sparklingBottles={sparklingBottles}
          roseBottles={roseBottles}
        />
      );
    }

    return (
      <QuizQuestion
        key={currentQuestion.id}
        question={currentQuestion.description.replace('{name}', memberName)}
        answers={currentQuestion.quizanswerSet}
        maxAnswers={currentQuestion.maxAnswers}
        selectedAnswers={selectedAnswers[currentQuestion.id] || []}
        handleAnswerSelectParent={this.handleAnswerSelect}
        questionId={currentQuestion.id}
        sortOrder={currentQuestion.sortOrder}
      />
    );
  };

  /**
   * Renders Quiz Question with possible Quiz Answers.
   *
   * @returns {*}
   */
  renderQuiz() {
    const { allQuizQuestionsQuery } = this.props;
    const { currentQuestionIndex, email } = this.state;

    if (allQuizQuestionsQuery.loading) return 'Loading from here...';
    if (allQuizQuestionsQuery.error) return `Error! ${allQuizQuestionsQuery.error.message}`;

    const allQuizQuestions = this.getAllQuizQuestions();

    const [lastQuestion] = allQuizQuestions.slice(-1);
    const isQuizDone = currentQuestionIndex > lastQuestion.sortOrder;

    return (
      <div>
        {!isQuizDone && this.renderCurrentQuizQuestion()}
        {!isQuizDone && this.renderNextAndPrevButtons()}

        { // Renders email input for new users only
          !isLoggedIn()
          && isQuizDone
          && (
            <div className="Quiz--form-input">
              <InputField
                label="Email"
                placeholder="Email"
                name="email"
                id="email"
                type="email"
                onChange={(field, value) => this.setState({ [field]: value })}
                validations={[checkEmail]}
              />
            </div>
          )
        }
        { // Renders submit button when Quiz is done
          isQuizDone && (
            <button
              onClick={() => this.handleSubmitQuiz()}
              type="button"
              disabled={!email && !isLoggedIn()}
            >
              submit
            </button>
          )
        }
      </div>
    );
  }

  /**
   * Renders Next and Previous buttons if user is able to to navigate from specific Question.
   *
   * @returns {*}
   */
  renderNextAndPrevButtons = () => {
    const {
      selectedAnswers, quizVersion, currentQuestionIndex,
    } = this.state;
    const { allQuizQuestionsQuery } = this.props;

    const currentQuestion = allQuizQuestionsQuery.allQuizQuestions.find(
      question => question.quizVersion.id === quizVersion && question.sortOrder === currentQuestionIndex,
    );
    const numberOfAnswers = (
      selectedAnswers[currentQuestion.id] && selectedAnswers[currentQuestion.id].length
    ) || 0;

    // maxAnswers is equivalent of requiredAnswers
    const isCurrentQuestionAnswered = numberOfAnswers === currentQuestion.maxAnswers;

    // For logged in users doesn't go to index 0, which stands for question about first name
    const previousPageIndex = isLoggedIn() && currentQuestionIndex === 1 ? 1 : currentQuestionIndex - 1;

    return (
      <div>
        <button
          type="button"
          onClick={() => this.navigateToThePreviousPage()}
          className="link-button"
          disabled={previousPageIndex === currentQuestionIndex}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => this.navigateToTheNextPage()}
          className="link-button"
          disabled={!isCurrentQuestionAnswered}
        >
          Next
        </button>
      </div>
    );
  };

  render() {
    const { meQuery } = this.props;
    const { memberName, currentQuestionIndex } = this.state;

    // Renders Quiz immediately for new users, for logged users wait for the me query
    if (isLoggedIn() && meQuery.loading) return <div className="Quiz">Loading...</div>;

    return (
      <div className="Quiz">
        <div className="Quiz--container">
          <div className="Quiz--form">
            {
              currentQuestionIndex === 0 && (
                <div>
                  <InputField
                    label="Let's start by getting to a first name basis.
                           You can call me Sommy. What's your name?"
                    name="memberName"
                    id="memberName"
                    value={memberName}
                    onChange={(field, value) => this.setState({ [field]: value })}
                  />
                  <button
                    type="button"
                    onClick={() => this.setState({ currentQuestionIndex: 1 })}
                    disabled={!memberName}
                  >
                    Next
                  </button>
                </div>
              )
            }
            { // Renders Quiz if Member answered the first question about first name
              memberName && currentQuestionIndex > 0 && this.renderQuiz()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(GET_QUIZ_QUESTIONS, { name: 'allQuizQuestionsQuery' }),
  graphql(
    GET_REFERRAL_DISCOUNT, {
      name: 'referralDiscountQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
  graphql(SUBMIT_QUIZ, {
    name: 'submitQuiz',
    options: { refetchQueries: isLoggedIn() ? () => [{ query: GET_MEMBER }] : [] },
  }),
  graphql(SET_MEMBER_AUTH, { name: 'setMemberAuth' }),
  graphql(SET_REFERRAL_DISCOUNT, { name: 'setReferralDiscount' }),
  graphql(GET_MEMBER, { name: 'meQuery' }),
)(Quiz);
