import bcrypt from "bcrypt";

interface generateOtpInpData {
  email: string;
  validityTimeInMinutes: string;
}

interface verifyOtpInpData {
  email: string;
  otp: number;
  hash: string;
}

export const otpGenerator = async (data: generateOtpInpData) => {
  const maxOtpVal = 999999;
  const minOtpVal = 100000;
  const randomOtp =
    Math.floor(Math.random() * (maxOtpVal - minOtpVal + 1)) + minOtpVal;
  const timeInNumber = Number(data?.validityTimeInMinutes);
  const validityInMilliSeconds = timeInNumber * 60 * 1000;
  const expiresIn = Date.now() + validityInMilliSeconds;
  //expiresIn is attached to never have same hash for any other data
  const dataToBeHashed = `${data?.email}.${randomOtp}.${expiresIn}`;
  const hash = await bcrypt.hash(dataToBeHashed, 10);
  const hashWithExpiryTime = `${hash}.${expiresIn}`;
  return {
    hashedData: hashWithExpiryTime,
    otp: randomOtp,
  };
};

//code to verify the otp
export const otpVerifier = async (data: verifyOtpInpData) => {
  try {
    const dataInArr = data?.hash?.split(".");
    const latestTime = Date.now();
    const expiresIn = dataInArr[dataInArr.length - 1];
    if (latestTime > Number(expiresIn)) {
      return {
        isVerified: false,
        message: "OTP expired. Please try again.",
      };
    }
    const dataToBeHashed = `${data?.email}.${data?.otp}.${expiresIn}`;
    dataInArr.splice(dataInArr.length - 1, 1);
    const onlyHash = dataInArr.join(".");
    const ok = await bcrypt.compare(dataToBeHashed, onlyHash);
    if (!ok) {
      return {
        isVerified: false,
        message: "Invalid OTP.",
      };
    }
    return {
      isVerified: true,
      message: "OTP Verification Successful.",
    };
  } catch (error) {
    return {
      isVerified: false,
      message: "Something went wrong. Please try again",
    };
  }
};
