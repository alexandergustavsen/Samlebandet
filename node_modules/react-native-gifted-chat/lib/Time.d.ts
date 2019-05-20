import PropTypes from 'prop-types';
import { Component } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { LeftRightStyle, IMessage } from './types';
interface TimeProps<TMessage extends IMessage = IMessage> {
    position: 'left' | 'right';
    currentMessage?: TMessage;
    containerStyle?: LeftRightStyle<ViewStyle>;
    textStyle?: LeftRightStyle<TextStyle>;
    timeFormat?: string;
}
export default class Time extends Component<TimeProps> {
    static contextTypes: {
        getLocale: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        position: string;
        currentMessage: {
            createdAt: null;
        };
        containerStyle: {};
        textStyle: {};
        timeFormat: string;
        timeTextStyle: {};
    };
    static propTypes: {
        position: PropTypes.Requireable<string>;
        currentMessage: PropTypes.Requireable<object>;
        containerStyle: PropTypes.Requireable<PropTypes.InferProps<{
            left: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
            right: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
        }>>;
        textStyle: PropTypes.Requireable<PropTypes.InferProps<{
            left: PropTypes.Requireable<any>;
            right: PropTypes.Requireable<any>;
        }>>;
        timeFormat: PropTypes.Requireable<string>;
        timeTextStyle: PropTypes.Requireable<PropTypes.InferProps<{
            left: PropTypes.Requireable<any>;
            right: PropTypes.Requireable<any>;
        }>>;
    };
    render(): JSX.Element | null;
}
export {};
