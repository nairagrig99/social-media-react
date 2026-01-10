import Spinner from "../Spinner";
import {RootState} from "../../Store/store";
import {useSelector} from "react-redux";


interface WithLoadingPropsState {
    statusProps?: (state: RootState) => string | any
}

const Loading = <P extends object>(WrappedComponent: React.ComponentType<P>, config: WithLoadingPropsState) => {

    return function WithLoadingComponent(props: P) {
        // @ts-ignore
        const selectStatus = useSelector(config.statusProps);
        if (selectStatus === 'loading') {
            return <Spinner/>
        }

        return <WrappedComponent {...props} />;
    };
};

export default Loading;