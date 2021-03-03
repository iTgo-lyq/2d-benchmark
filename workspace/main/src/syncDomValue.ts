let ranges = document.querySelectorAll("input[type='range']");

Array.prototype.forEach.call(ranges, (dom: HTMLInputElement) => {
  const nextDom = dom.nextElementSibling as HTMLInputElement

  if (nextDom?.tagName === 'INPUT') {
    dom.addEventListener("change", syncText);
    nextDom.addEventListener("change", syncRange);
  }
})

let selector = document.getElementsByName('example')[0];

selector.addEventListener("change", updateOptions);

function updateOptions(event: any) {
  const value = event.target.options[event.target.options.selectedIndex].value;
  let objectCountInput = document.getElementsByName("objectCount")[0] as any

  if (value === "dragonbone" && objectCountInput.value > 100) {
    objectCountInput.value = 50;
    objectCountInput.nextElementSibling.value = 50;
  }

  (document.getElementById("control") as any).dataset.example = value
}

function syncRange(event: any) {
  event.target.previousElementSibling.value = event.target.value;
}

function syncText(event: any) {
  event.target.nextElementSibling.value = event.target.value;
}