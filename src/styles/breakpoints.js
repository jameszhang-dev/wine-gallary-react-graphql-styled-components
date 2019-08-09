const xs = 575;
const sm = 767;
const md = 991;
const lg = 1199;

const breakpoints = {
  xsDown: `@media (max-width: ${xs}px)`,
  smDown: `@media (max-width: ${sm}px)`,
  mdDown: `@media (max-width: ${md}px)`,
  lgDown: `@media (max-width: ${lg}px)`,

  xsUp: `@media (min-width: ${xs + 1}px)`,
  smUp: `@media (min-width: ${sm + 1}px)`,
  mdUp: `@media (min-width: ${md + 1}px)`,
  lgUp: `@media (min-width: ${lg + 1}px)`,
};

export default breakpoints;
