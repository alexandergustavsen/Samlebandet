import { Component } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import PropTypes from 'prop-types';
import { IMessage } from './types';
interface SystemMessageProps<TMessage extends IMessage = IMessage> {
    currentMessage?: TMessage;
    containerStyle?: ViewStyle;
    wrapperStyle?: ViewStyle;
    textStyle?: TextStyle;
}
export default class SystemMessage extends Component<SystemMessageProps> {
    static defaultProps: {
        currentMessage: {
            system: boolean;
        };
        containerStyle: {};
        wrapperStyle: {};
        textStyle: {};
    };
    static propTypes: {
        currentMessage: PropTypes.Requireable<object>;
        containerStyle: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
        wrapperStyle: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
        textStyle: PropTypes.Requireable<any>;
    };
    render(): JSX.Element | null;
}
export {};
