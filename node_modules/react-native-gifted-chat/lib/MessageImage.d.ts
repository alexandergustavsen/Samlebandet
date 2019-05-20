import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageProps, ViewStyle, ImageStyle } from 'react-native';
import { IMessage } from './types';
interface MessageImageProps<TMessage extends IMessage = IMessage> {
    currentMessage?: TMessage;
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    imageProps?: Partial<ImageProps>;
    lightboxProps?: object;
}
export default class MessageImage extends Component<MessageImageProps> {
    static defaultProps: {
        currentMessage: {
            image: null;
        };
        containerStyle: {};
        imageStyle: {};
        imageProps: {};
        lightboxProps: {};
    };
    static propTypes: {
        currentMessage: PropTypes.Requireable<object>;
        containerStyle: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
        imageStyle: PropTypes.Requireable<object>;
        imageProps: PropTypes.Requireable<object>;
        lightboxProps: PropTypes.Requireable<object>;
    };
    render(): JSX.Element | null;
}
export {};
