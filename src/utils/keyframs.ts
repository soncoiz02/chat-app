import { keyframes } from "styled-components";

// righ in

const rightIn = keyframes`
  from {
    width: 100%;
    border-radius: 0;
  }
  to {
    width: 40%;
    border-radius: 30px 0 0 30px;
  }
`;

const righInReverse = keyframes`
  from {
    width: 40%;
    border-radius: 30px 0 0 30px;
  }
  to {
    width: 100%;
    border-radius: 0;
  }
`;

// righ out

const rightOut = keyframes`
  from {
    width: 100%;
    border-radius: 0;
  }
  to {
    width: 40%;
    border-radius: 0 30px 30px 0;
  }
`;

const rightOutReverse = keyframes`
  from {
    width: 40%;
    border-radius: 0;
  }
  to {
    width: 100%;
    border-radius: 0 30px 30px 0;
  }
`;

// left in

const leftIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const leftInReverse = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
  }
`;

// left out

const leftOut = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const leftOutReverse = keyframes`
  from {
    transform: translateX(0); 
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const disappear = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

export {
  leftIn,
  leftOut,
  rightIn,
  rightOut,
  righInReverse,
  fadeIn,
  disappear,
  leftInReverse,
  leftOutReverse,
  rightOutReverse,
};
