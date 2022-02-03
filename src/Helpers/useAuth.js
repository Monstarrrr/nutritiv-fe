const useAuth = () => {
    const user = { loggedIn: false }
    return user && user.loggedIn;
}

export default useAuth;