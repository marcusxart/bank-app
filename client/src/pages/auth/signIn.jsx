import { Link } from "react-router-dom";
import Button from "../../components/button";
import MaxContainer from "../../components/maxContainer";
import TextField from "../../components/textField";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import formChecker from "../../utils/formChecker";
import InfoModal from "../../components/infoModal";
import useAuth from "../../hooks/api/client/useAuth";
import Loader from "../../components/loader";
import { setCookie } from "../../utils/cookies";

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const [errorModal, setErrorModal] = useState(null);
  const [form, setForm] = useState({
    userId: userId || "",
    password: "",
  });

  const { handleLoginAccount, loginAccountData } = useAuth();

  const disabled = !formChecker(form);

  const handleSignIn = async () => {
    const res = await handleLoginAccount({
      data: form,
    });
    const token = res?.data?.accessToken;
    if (token) {
      setCookie("access", token, 5);
      console.log("success");
    }
  };
  return (
    <div>
      {loginAccountData?.loading && <Loader />}
      {errorModal && (
        <InfoModal
          type="error"
          message={errorModal}
          onClose={() => {
            setErrorModal(null);
          }}
        />
      )}
      <MaxContainer>
        <div className="mb-4">
          <h1 className="text-[32px] capitalize font-semibold">Log in</h1>
          <p className="text-[14px] text-gray-600 mt-1">
            Log in to your account.
          </p>
        </div>
        <div className="flex flex-col w-full gap-[32px]">
          <div className="flex flex-col w-full gap-[12px]">
            <TextField
              label="User ID"
              placeholder="Enter user ID"
              value={form?.userId}
              onChange={(e) => {
                const value = e?.target?.value;
                setForm((prev) => ({ ...prev, userId: value }));
              }}
            />
            <TextField
              label="Password"
              type="password"
              placeholder="Enter password"
              value={form?.password}
              onChange={(e) => {
                const value = e?.target?.value;
                setForm((prev) => ({ ...prev, password: value }));
              }}
            />
          </div>
          <Button
            disabled={disabled}
            text="Log in"
            type="secondary"
            onClick={handleSignIn}
          />
        </div>{" "}
        <p className="text-[14px] text-gray-600 mt-[20px]">
          Don&lsquo;t have an account?{" "}
          <Link
            className="text-secondary font-semibold"
            to="/auth/create-account"
          >
            Sign up
          </Link>
        </p>
      </MaxContainer>
    </div>
  );
};

export default SignIn;
