import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import MaxContainer from "../../components/maxContainer";
import TextField from "../../components/textField";
import { useMemo, useState } from "react";
import Dropdown from "../../components/dropdown";
import StepsComponent from "../../components/steps";
import PhoneTextField from "../../components/phoneTextField";
import { Country, State, City } from "country-state-city";
import InfoModal from "../../components/infoModal";
import useAuth from "../../hooks/api/client/useAuth";
import Loader from "../../components/loader";
import moment from "moment";
import formChecker from "../../utils/formChecker";

const SignUp = () => {
  const [step, setStep] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errorModal, setErrorModal] = useState(null);
  const [successModal, setSuccessModal] = useState(null);
  const navigate = useNavigate();
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthday: "",
    password: "",
    phoneNo: "",
    dialCode: "+1",
  });
  const [contact, setContact] = useState({
    country: "United States",
    state: "",
    city: "",
    zipcode: "",
    address: "",
  });
  const [account, setAccount] = useState({ currency: "usd", type: "" });

  const newStep = useMemo(() => {
    if (step) {
      return [...step]?.map((v) => {
        if (v?.value === currentStep) {
          return {
            ...v,
            status: "done",
          };
        }
        return v;
      });
    }
    return null;
  }, [currentStep, step]);

  const countries = Country.getAllCountries();

  const mappedCountries = countries?.map((country) => ({
    label: country?.name,
    value: country?.name,
  }));

  const findCountry = () => {
    if (contact?.country) {
      const findCountry = countries?.find(
        (country) => country?.name === contact?.country
      );

      return findCountry;
    }
    return null;
  };
  const getMappedStates = () => {
    const country = findCountry();
    if (country) {
      const states = State.getStatesOfCountry(country?.isoCode);

      return states?.map((state) => ({
        label: state?.name,
        value: state.name,
      }));
    }
    return [];
  };

  const mappedStates = getMappedStates();

  const getMappedCities = () => {
    const country = findCountry();
    if (country && contact?.state) {
      const states = State.getStatesOfCountry(country?.isoCode);
      const findState = states?.find((state) => state?.name === contact?.state);

      const cities = City.getCitiesOfState(
        country?.isoCode,
        findState?.isoCode
      );

      return cities?.map((city) => ({
        label: city?.name,
        value: city.name,
      }));
    }
    return [];
  };

  const mappedCities = getMappedCities();

  const removePassword = () => {
    const copyData = { ...personal };
    delete copyData?.password;

    return copyData;
  };
  const disableContact = !formChecker(contact);
  const disablePersonal = !formChecker(removePassword());
  const diabledAccount = !formChecker({
    ...account,
    password: personal?.password,
  });

  function isValidDate(dateString) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    if (!regex.test(dateString)) {
      return false;
    }

    const [month, day, year] = dateString.split("/").map(Number);

    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  const { handleCreateAccount, createAccountData } = useAuth();

  const handleCreate = async () => {
    const res = await handleCreateAccount({
      data: {
        personal: {
          ...personal,
          birthday: moment(personal?.birthday).format("YYYY-MM-DD"),
        },
        account,
        contact,
      },
    });
    if (res?.data) setSuccessModal(res?.data?.message);
  };
  return (
    <div>
      {createAccountData?.loading && <Loader />}
      {errorModal && (
        <InfoModal
          type="error"
          message={errorModal}
          onClose={() => {
            setErrorModal(null);
          }}
        />
      )}
      {successModal && (
        <InfoModal
          type="success"
          message={successModal}
          onClose={() => {
            navigate("/auth/sign-in");
          }}
        />
      )}
      <MaxContainer>
        <div className="mb-4">
          <h1 className="text-[32px] capitalize font-semibold">
            Welcome to <b className="text-primary">Trust bank</b>.{" "}
          </h1>
          <p className="text-[14px] text-gray-600 mt-1">
            Please enter your details.
          </p>
        </div>
        <div className="mb-3">
          <StepsComponent onChange={setStep} value={newStep} count={3} />
        </div>
        {currentStep === 1 ? (
          <div className="flex flex-col w-full gap-[32px]">
            <div className="flex flex-col w-full gap-[12px]">
              <h2 className="text-[24px] font-medium">Personal information</h2>
              <div className="flex gap-[12px]">
                <TextField
                  label="First name"
                  placeholder="Enter First Name"
                  value={personal?.firstName}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    setPersonal((prev) => ({ ...prev, firstName: value }));
                  }}
                />
                <TextField
                  label="Last name"
                  placeholder="Enter Last Name"
                  value={personal?.lastName}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    setPersonal((prev) => ({ ...prev, lastName: value }));
                  }}
                />
              </div>

              <div className="flex gap-[12px]">
                <TextField
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  value={personal?.email}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    setPersonal((prev) => ({ ...prev, email: value }));
                  }}
                />
                <div className="w-full">
                  <PhoneTextField
                    dialCode={personal?.dialCode}
                    label="Phone number"
                    placeholder="Enter Phone Number"
                    value={personal?.phoneNo}
                    onChange={(inputValue, dialCode) => {
                      const value = inputValue?.replace(/[^0-9]/g, "");
                      setPersonal((prev) => ({
                        ...prev,
                        dialCode: dialCode,
                        phoneNo: value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-[12px]">
                <div className="w-full">
                  <Dropdown
                    full
                    label="Gender"
                    value={personal?.gender}
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Others", value: "Others" },
                    ]}
                    onChange={(value) => {
                      setPersonal((prev) => ({ ...prev, gender: value }));
                    }}
                  />
                </div>
                <div className="w-full">
                  <TextField
                    label="Date of birth"
                    placeholder="MM/DD/YYYY"
                    type="email"
                    value={personal?.birthday}
                    onChange={(e) => {
                      const value = e?.target?.value?.replace(/[^0-9/]/g, "");
                      setPersonal((prev) => ({ ...prev, birthday: value }));
                    }}
                  />
                </div>
              </div>
            </div>
            <Button
              text="Proceed"
              type="secondary"
              disabled={disablePersonal}
              onClick={() => {
                const validDate = isValidDate(personal?.birthday);
                if (validDate) {
                  setCurrentStep(2);
                } else {
                  setErrorModal(
                    "Invalid date format. Please use MM/DD/YYYY (e.g., 12/30/2000)."
                  );
                }
              }}
            />
          </div>
        ) : currentStep === 2 ? (
          <div className="flex flex-col w-full gap-[32px]">
            <div className="flex flex-col w-full gap-[12px]">
              <h2 className="text-[24px] font-medium">Contact information</h2>
              <div className="flex gap-[12px] w-full">
                <div className="w-full">
                  <Dropdown
                    full
                    value={contact?.country}
                    label="Country"
                    placeholder="Select Country"
                    options={mappedCountries}
                    onChange={(value) => {
                      setContact((prev) => ({ ...prev, country: value }));
                    }}
                  />
                </div>
                <div className="w-full">
                  <Dropdown
                    disabled={!mappedStates?.length}
                    full
                    value={contact?.state}
                    label="State/Province/Region"
                    placeholder="Select State/Province/Region"
                    options={mappedStates}
                    onChange={(value) => {
                      setContact((prev) => ({ ...prev, state: value }));
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-[12px]">
                {" "}
                <div className="w-full">
                  <Dropdown
                    full
                    label="City"
                    disabled={!mappedCities?.length}
                    value={contact?.city}
                    placeholder="Select City"
                    options={mappedCities}
                    onChange={(value) => {
                      setContact((prev) => ({ ...prev, city: value }));
                    }}
                  />
                </div>
                <TextField
                  label="ZIP code"
                  placeholder="Enter ZIP Code"
                  value={contact?.zipcode}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    setContact((prev) => ({ ...prev, zipcode: value }));
                  }}
                />
              </div>

              <div className="flex gap-[12px]">
                <TextField
                  label="Street Address"
                  type="textarea"
                  placeholder="Enter Street Address"
                  value={contact?.address}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    setContact((prev) => ({ ...prev, address: value }));
                  }}
                />
              </div>
            </div>
            <Button
              text="Proceed"
              type="secondary"
              disabled={disableContact}
              onClick={() => {
                setCurrentStep(3);
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full gap-[32px]">
            <div className="flex flex-col w-full gap-[12px]">
              <h2 className="text-[24px] font-medium">Account Information</h2>

              <div className="flex gap-[12px] w-full">
                <div className="w-full">
                  <Dropdown
                    full
                    label="Account type"
                    placeholder="Select account type"
                    value={account?.type}
                    onChange={(value) => {
                      setAccount((prev) => ({ ...prev, type: value }));
                    }}
                    options={[
                      { label: "Personal", value: "personal" },
                      { label: "Current", value: "current" },
                      { label: "Checking", value: "checking" },
                    ]}
                  />
                </div>
                <div className="w-full">
                  <Dropdown
                    full
                    label="Currency"
                    placeholder="Select currency"
                    value={account?.currency}
                    onChange={(value) => {
                      setAccount((prev) => ({ ...prev, currency: value }));
                    }}
                    options={[
                      { label: "US Dollar", value: "usd" },
                      { label: "Euro", value: "eur" },
                      { label: "Pound sterling", value: "gbp" },
                    ]}
                  />
                </div>
              </div>
              <TextField
                label="Password"
                placeholder="Enter password"
                type="password"
                value={personal?.password}
                onChange={(e) => {
                  const value = e?.target?.value;
                  setPersonal((prev) => ({ ...prev, password: value }));
                }}
              />
            </div>
            <Button
              text="Create account"
              type="secondary"
              disabled={diabledAccount}
              onClick={handleCreate}
            />
          </div>
        )}
        <p className="text-[14px] text-gray-600 mt-[20px]">
          Already have an account?{" "}
          <Link className="text-secondary font-semibold" to="/auth/sign-in">
            Log in
          </Link>
        </p>
      </MaxContainer>
    </div>
  );
};

export default SignUp;
