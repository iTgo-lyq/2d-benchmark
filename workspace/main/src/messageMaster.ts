const iframe = document.getElementById("iframe") as HTMLIFrameElement;
const control = document.getElementById("control") as HTMLFormElement;

iframe.addEventListener("load", updateIframe)
control.addEventListener("change", updateIframe)

updateIframe();

function getData(): PageState {
  let formdata = new FormData(control)
  return {
    type: 'MINE_2D',
    lib: formdata.get('lib') + '',
    example: formdata.get('example') + '',
    objectCount: +formdata.get('objectCount')!,
    textureCount: +formdata.get('textureCount')!,
    dbCount: +formdata.get('dbCount')!,
    textContent: formdata.get('textContent') + ''
  }
}

function updateIframe() {
  const data = getData();

  console.log(data)

  if (iframe.src.indexOf(data.lib) === -1)
    iframe.src = `/${data.lib}/index.html`
  else {
    iframe.contentWindow?.postMessage(data, "*");
    window.tempData = data
  }
}