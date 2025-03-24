export const removeBetween = (
  code: string,
  start: string,
  end: string
): string => {
  let prevFound = 0;
  let cleanedCode = code;

  while (prevFound < cleanedCode.length && cleanedCode.includes(start)) {
    const commentStartIdx = cleanedCode.indexOf(start, prevFound);
    let commentEndIdx = cleanedCode.indexOf(end, commentStartIdx) + end.length;
    if (commentEndIdx === end.length - 1) {
      commentEndIdx = cleanedCode.length;
    }

    prevFound = commentStartIdx;
    cleanedCode = cleanedCode.replace(
      cleanedCode.substring(commentStartIdx, commentEndIdx),
      ""
    );
  }

  return cleanedCode;
};
