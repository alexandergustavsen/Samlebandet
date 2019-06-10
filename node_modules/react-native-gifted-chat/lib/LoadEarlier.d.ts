import PropTypes from 'prop-types';
import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
interface LoadEarlierProps {
    isLoadingEarlier?: boolean;
    label?: string;
    containerStyle?: ViewStyle;
    wrapperStyle?: ViewStyle;
    textStyle?: TextStyle;
    activityIndicatorStyle?: ViewStyle;
    activityIndicatorColor?: string;
    activityIndicatorSize?: number | 'small' | 'large';
    onLoadEarlier?(): void;
}
export default class LoadEarlier extends React.Component<LoadEarlierProps> {
    static defaultProps: {
        onLoadEarlier: () => void;
        isLoadingEarlier: boolean;
        label: string;
        containerStyle: {};
        wrapperStyle: {};
        textStyle: {};
        activityIndicatorStyle: {};
        activityIndicatorColor: string;
        activityIndicatorSize: string;
    };
    static propTypes: {
        onLoadEarlier: PropTypes.Requireable<(...args: any[]) => any>;
        isLoadingEarlier: PropTypes.Requireable<boolean>;
        label: PropTypes.Requireable<string>;
        containerStyle: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
        wrapperStyle: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
        textStyle: PropTypes.Requireable<any>;
        activityIndicatorStyle: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
        activityIndicatorColor: PropTypes.Requireable<string>;
        activityIndicatorSize: PropTypes.Requireable<string>;
    };
    renderLoading(): JSX.Element;
    render(): JSX.Element;
}
export {};
