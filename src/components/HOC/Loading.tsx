import Spinner from "../Spinner";

interface WithLoadingProps {
    status?: string;
}

const Loading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {

    return function WithLoadingComponent(props: P & WithLoadingProps) {

        const {status, ...rest} = props;

        if (status === 'loading') {
            return <Spinner/>
        }

        return <WrappedComponent {...(rest as P)} />;
    };
};

export default Loading;