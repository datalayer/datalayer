import { useState } from 'react'
import html2canvas from 'html2canvas'
import { useDispatch } from 'react-redux';
import { tellActions } from '../state/tell';

const useScreenshot = ({ type = '', quality = 1 } = {}) => {
  const [image, setImage] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch();

  const takeScreenShot = (node: HTMLDivElement) => {
    if (!node) {
      throw new Error('You should provide correct html node.')
    }
    const outputAreaNode = document.getElementsByClassName('jp-OutputArea-output')[0];
//    return html2canvas(node)
    return html2canvas(outputAreaNode as HTMLElement)
      .then((canvas) => {
        const croppedCanvas = document.createElement('canvas');
        const croppedCanvasContext = croppedCanvas.getContext('2d');
        //
        const cropPositionTop = 0;
        const cropPositionLeft = 0;
        const cropWidth = canvas.width;
        const cropHeight = canvas.height;
        //
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
        //
        croppedCanvasContext?.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop,
        );
        const outputshotData = croppedCanvas.toDataURL(type, quality);
        setImage(outputshotData);
        dispatch(tellActions.update.started({
          outputshotData: outputshotData,
        }));
        return outputshotData
      })
      .catch(
        setError
      )
  }

  return [
    image,
    takeScreenShot,
    {
      error,
    },
  ]
}

/**
 * creates name of file
 * @param {string} extension
 * @param  {string[]} parts of file name
 */
const createFileName = (extension = '', ...names) => {
  if (!extension) {
    return ''
  }

  return `${names.join('')}.${extension}`
}

export { useScreenshot, createFileName }
