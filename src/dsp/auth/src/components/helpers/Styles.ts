import { makeStyles } from '@material-ui/core/styles';
import { tooltipsStyle, typographyStyle } from "dspWidgets/Widgets";

export const useTooltipStyles = makeStyles(tooltipsStyle);
export const useTypographyStyles = makeStyles(typographyStyle);

export const useFormStyles = makeStyles(theme => ({
  form: {
    '& > *': {
//      margin: theme.spacing(2),
      width: '100%'
    }
  },
  formTitle: {
//      textAlign: 'center'
  },
  spaced: {
    marginBottom: `${theme.spacing(2)} !important`
  }
}));
