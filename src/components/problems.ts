const easy = ["아", "야"];
const normal = ["아카", "아캬"];
const hard = ["아카이", "아캬이"];
const harder = ["아카이브", "아캬이브"];
const demon = ["2025화이팅", "2025화이딩"];

export interface ProbelmSet {
  letters: string[];
  boundary: number;
  time_limit: number;
}

export const easyProblem: ProbelmSet = {
  letters: easy,
  boundary: 2,
  time_limit: 8,
};

export const normalProblem: ProbelmSet = {
  letters: normal,
  boundary: 3,
  time_limit: 4,
};

export const hardProblem: ProbelmSet = {
  letters: hard,
  boundary: 3,
  time_limit: 4,
};

export const harderProblem: ProbelmSet = {
  letters: harder,
  boundary: 4,
  time_limit: 3,
};

export const demonProblem: ProbelmSet = {
  letters: demon,
  boundary: 5,
  time_limit: 2,
};
