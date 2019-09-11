import { loadTheme } from 'office-ui-fabric-react/lib/Styling'
import { initializeIcons } from '@uifabric/icons'

export function loadDatalayerTheme() {
  // Register icons and pull the fonts from the default SharePoint cdn:
  initializeIcons()
  /*
  46 204 113  datalayer-green-light  #2ecc71
  26 188 156  datalayer-green-main   #1abc9c
  22 160 133  datalayer-green-dark   #16a085
  89 89 92    datalayer-gray   #59595c
  0 0 0       datalayer-black  #000000
  255 255 255 datlayer-white   #FFFFFF
  */
  loadTheme({
    palette: {
      'themePrimary': '#038387',
      'themeDarkAlt': '#16a085'
  //    'themeDarkAlt': '#20a8d8'
    }
  })

}

export const jsonTreeMonokaiTheme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
  }
  