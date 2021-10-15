/** 判断一个div的边界，允许difference = 50px的偏差 */
export function defineBoundary(
  val: string | number,
  toMatchVal: string | number,
  difference = 50
) {
  if (
    Number(toMatchVal) >= Number(val) - difference &&
    Number(val) + difference >= toMatchVal
  ) {
    return true;
  } else {
    return false;
  }
}
