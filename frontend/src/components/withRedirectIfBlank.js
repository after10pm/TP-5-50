import { Navigate } from 'react-router-dom';

const withRedirectIfBlank = (config) => (Component) => (props) => {
    const { redirectCondition, redirectTo } = config;

    if (redirectCondition(props)) {
        return <Navigate replace to={redirectTo} />;
    }

    return <Component {...props} />;
};

export { withRedirectIfBlank };