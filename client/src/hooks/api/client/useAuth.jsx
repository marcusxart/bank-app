import useAxios from "axios-hooks";

function useAuth() {
  const url = "/auth";
  const [{ ...createAccountData }, createAccount] = useAxios(
    { method: "POST" },
    { manual: true }
  );
  async function handleCreateAccount({ data }) {
    return await createAccount({
      url: `${url}/create-user`,
      data,
    });
  }

  const [{ ...loginAccountData }, loginAccount] = useAxios(
    { method: "POST" },
    { manual: true }
  );
  async function handleLoginAccount({ data }) {
    return await loginAccount({
      url: `${url}/sign-in`,
      data,
    });
  }

  return {
    createAccountData,
    handleCreateAccount,
    handleLoginAccount,
    loginAccountData,
  };
}

export default useAuth;
