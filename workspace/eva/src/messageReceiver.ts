const state: PageState = {
  type: 'MINE_2D',
  lib: 'eva',
  example: 'spirit-example',
  textureCount: 730,
  objectCount: 2000,
  dbCount: 5,
  textContent: "benchmark"
}

let onChange: (_: PageState) => void;

window.addEventListener("message", ({ data: newData }) => {
  if (newData.type !== state.type) return;
  if (JSON.stringify(state) === JSON.stringify(newData)) return;

  Object.assign(state, newData)

  onChange.call(null, state);
})

export function handleChangeData(fn: typeof onChange) {
  onChange = fn
}
