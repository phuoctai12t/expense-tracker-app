/* eslint-disable react-native/no-unused-styles */
import { createTheme } from '@rneui/themed'
import Colors from 'constant/Colors'
import Layout from 'constant/Layout'
import { PressableAndroidRippleConfig, StyleSheet } from 'react-native'
import { BaseToast, BaseToastProps, ToastConfig } from 'react-native-toast-message'

const cal = (num = 0) => Layout.spacing * num

const baseStyles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  backgroundBlack: {
    backgroundColor: Colors.black,
  },
  backgroundError: {
    backgroundColor: Colors.error,
  },
  backgroundPrimary: {
    backgroundColor: Colors.primary,
  },
  backgroundSecondary: {
    backgroundColor: Colors.secondary,
  },
  backgroundSuccess: {
    backgroundColor: Colors.success,
  },
  backgroundWhite: {
    backgroundColor: Colors.white,
  },
  border: {
    borderColor: '#DFDFDF',
    borderWidth: 1,
  },
  borderRadius: {
    borderRadius: 5,
  },
  borderRadius1: {
    borderRadius: 10,
  },
  flex1: {
    flex: 1,
  },
  flexCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  flexReset: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 1,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  label: {
    fontFamily: 'medium',
    fontSize: 18,
  },
  m: {
    margin: cal(1),
  },
  m1: {
    margin: cal(2),
  },
  m2: {
    margin: cal(4),
  },
  mb: {
    marginBottom: cal(1),
  },
  mb1: {
    marginBottom: cal(2),
  },
  mb2: {
    marginBottom: cal(4),
  },
  me: {
    marginRight: cal(1),
  },
  me1: {
    marginRight: cal(2),
  },
  me2: {
    marginRight: cal(4),
  },
  ms: {
    marginLeft: cal(1),
  },
  ms1: {
    marginLeft: cal(2),
  },
  ms2: {
    marginLeft: cal(4),
  },
  mt: {
    marginTop: cal(1),
  },
  mt1: {
    marginTop: cal(2),
  },
  mt2: {
    marginTop: cal(4),
  },
  mx: {
    marginHorizontal: cal(1),
  },
  mx1: {
    marginHorizontal: cal(2),
  },
  mx2: {
    marginHorizontal: cal(4),
  },
  mxGap: {
    marginHorizontal: Layout.gap,
  },
  my: {
    marginVertical: cal(1),
  },
  my1: {
    marginVertical: cal(2),
  },
  my2: {
    marginVertical: cal(4),
  },
  noti: {
    marginHorizontal: Layout.gap,
    marginVertical: cal(1),
    textAlign: 'center',
  },
  p: {
    padding: cal(1),
  },
  p1: {
    padding: cal(2),
  },
  p2: {
    padding: cal(4),
  },
  pb: {
    paddingBottom: cal(1),
  },
  pb1: {
    paddingBottom: cal(2),
  },
  pb2: {
    paddingBottom: cal(4),
  },
  pe: {
    paddingRight: cal(1),
  },

  pe1: {
    paddingRight: cal(2),
  },
  pe2: {
    paddingRight: cal(4),
  },
  ps: {
    paddingLeft: cal(1),
  },
  ps1: {
    paddingLeft: cal(2),
  },
  ps2: {
    paddingLeft: cal(4),
  },
  pt: {
    paddingTop: cal(1),
  },
  pt1: {
    paddingTop: cal(2),
  },
  pt2: {
    paddingTop: cal(4),
  },
  px: {
    paddingHorizontal: cal(1),
  },
  px1: {
    paddingHorizontal: cal(2),
  },
  px2: {
    paddingHorizontal: cal(4),
  },
  pxGap: {
    paddingHorizontal: Layout.gap,
  },
  py: {
    paddingVertical: cal(1),
  },
  py1: {
    paddingVertical: cal(2),
  },
  py2: {
    paddingVertical: cal(4),
  },
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowBetweenCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  selfStart: {
    alignSelf: 'flex-start',
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  textBlack: {
    color: Colors.black,
  },
  textBold: {
    fontFamily: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  textDanger: {
    color: Colors.error,
  },
  textEnd: {
    textAlign: 'right',
  },
  textMedium: {
    fontFamily: 'medium',
  },
  textPrimary: {
    color: Colors.primary,
  },
  textRegular: {
    fontFamily: 'regular',
  },
  textSecondary: {
    color: Colors.secondary,
  },
  textStart: {
    textAlign: 'left',
  },
  textSuccess: {
    color: Colors.success,
  },
  textWhite: {
    color: Colors.white,
  },
})

const extraStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.gap,
    paddingVertical: 20,
  },
})

const toastConfigParamDefault: BaseToastProps = {
  text2Style: {
    fontSize: 14,
    lineHeight: 18,
    ...baseStyles.textRegular,
  },
  style: {
    height: 'auto',
    paddingVertical: 10,
    minHeight: 60,
  },
  text2Props: { numberOfLines: 5 },
}

export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      {...toastConfigParamDefault}
      style={[toastConfigParamDefault.style, { borderLeftColor: Colors.success }]}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      {...toastConfigParamDefault}
      style={[toastConfigParamDefault.style, { borderLeftColor: Colors.error }]}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      {...toastConfigParamDefault}
      style={[toastConfigParamDefault.style, { borderLeftColor: Colors.warning }]}
    />
  ),
}

const androidRipple: PressableAndroidRippleConfig = {
  borderless: false,
  ...baseStyles.textPrimary,
}

export const RNElementTheme = createTheme({
  lightColors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
  },
  Avatar: {
    titleStyle: {
      ...baseStyles.textMedium,
    },
  },
  Button: {
    titleStyle: {
      ...baseStyles.textMedium,
    },
  },
  CheckBox: {
    textStyle: {
      ...baseStyles.textRegular,
    },
  },
  Input: {
    labelStyle: {
      ...baseStyles.textRegular,
    },
    inputStyle: {
      ...baseStyles.textRegular,
    },
  },
  Text: {
    h1Style: {
      ...baseStyles.textBold,
    },
    h2Style: {
      ...baseStyles.textBold,
    },
    h3Style: {
      ...baseStyles.textMedium,
    },
    h4Style: {
      ...baseStyles.textMedium,
    },
    style: {
      ...baseStyles.textRegular,
    },
  },
  ListItem: {
    android_ripple: {
      ...androidRipple,
    },
    containerStyle: {
      backgroundColor: 'transparent',
    },
    style: {
      ...baseStyles.backgroundWhite,
    },
  },
})

export default { ...baseStyles, ...extraStyles }
