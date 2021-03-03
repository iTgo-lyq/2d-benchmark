interface PageState {
  type: 'MINE_2D',
  lib: string;
  example: string;
  objectCount: number;
  textureCount: number;
  dbCount: number;
  textContent: string;
}

interface Window {
  tempData: PageState
}

interface SubWindow {
  myData: PageState
}

interface AssetsInfo {
  db: {
    [name in string]: [{
      name: string;
      action: [
        { name: string; anim: string[] },
        { name: string; anim: string[] }
      ]
    },
      string,
      { name: string; w: number; h: number }]
  },
  spirit: {
    [path in string]: {
      name: string,
      w: number,
      h: number
    }[]
  }
}