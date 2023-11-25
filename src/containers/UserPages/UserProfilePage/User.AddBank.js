import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import { Notification } from "../../../components/ToastNotification";
import { updateTxrAddressValidate } from "../../../components/Validation/vaildate";
import {
  useAddBankMutation,
  useEditTrxAddressMutation,
  useGetLoginUserQuery,
  useGetUserBankDetailQuery,
} from "../../../Services/userApi";

const UpdateWallet = () => {
  const { data: userBankData } = useGetUserBankDetailQuery();
  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState({
    bankName: '',
    holderName: '',
    accountNumber: '',
    IFSCCode: '',
    branchName:''
  });
  const [addBank ,{ data:bankData, isLoading, error}] = useAddBankMutation();
  useEffect(() => {
    if (bankData?.message) {
      Notification(bankData?.message, "success");
      
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, bankData]);
  useEffect(() => {
    setFormErrors(updateTxrAddressValidate(data));
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("Space is not allow in TRX Address", "error");
    } else {
      await addBank(data);
    }
  };
  return (
    <div className='ss-trade_updatewallet_page_wrapper'>
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className='ss-trade_updatewallet_card'
      >
        <div className='ss-trade_updatewallet_title'>
          <h2>Add Bank Info</h2>
        </div>
        <div className='ss-trade_updatewallet_field'>
          <form onSubmit={handleSubmit}>
            <div className='form_group'>
              <Input
                label='Bank  Name'
                type='text'
                value={data.bankName}
                name='bankName'
                onChange={(e) => setData({ ...data, bankName: e.target.value })}
                placeholder='Enter Your Bank  Name'
              />
              <Input
                label='Holder name'
                type='text'
                value={data.holderName}
                name='holderName'
                onChange={(e) =>
                  setData({ ...data, holderName: e.target.value })
                }
                placeholder='Enter Account Holder name'
              />
              <Input
                label='Account number'
                type='number'
                value={`${data?.accountNumber}`}
                name='accountNumber'
                onChange={(e) =>
                  setData({ ...data, accountNumber: e.target.value })
                }
                placeholder='Enter Account number'
              />
              <Input
                label='IFSC Code'
                type='text'
                value={data.IFSCCode}
                name='IFSCCode'
                onChange={(e) =>
                  setData({ ...data, IFSCCode: e.target.value })
                }
                placeholder='Enter IFSC Code'
              />
              <Input
                label='Branch Name'
                type='text'
                value={data.branchName}
                name='branchName'
                onChange={(e) =>
                  setData({ ...data, branchName: e.target.value })
                }
                placeholder='Enter Branch Name'
              />
            </div>
            <Button
              type='submit'
              className='updatewallet_btn'
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "submit"}
            </Button>
          </form>
        </div>
      </CardLayout>

      {/* Preview */}
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className='ss-trade_updatewallet_card'
      >
        <div className='ss-trade_updatewallet_title'>
          <h2>Preview Bank Info</h2>
        </div>
        <div className='ss-trade_updatewallet_field'>
          <form>
            <div className='form_group'>
              <Input
                label='Bank  Name'
                type='text'
                value={userBankData?.banks?.[0]?.bankName}
                disabled
                name='bankName'
                onChange={(e) => setData({ ...data, bankName: e.target.value })}
                placeholder='Enter Your Bank  Name'
              />
              <Input
                label='Holder name'
                type='text'
                value={userBankData?.banks?.[0]?.holderName
                }
                disabled
                name='holderName'
                onChange={(e) =>
                  setData({ ...data, holderName: e.target.value })
                }
                placeholder='Enter Account Holder name'
              />
              <Input
                label='Account number'
                type='number'
                value={userBankData?.banks?.[0]?.accountNumber}
                name='accountNumber'
                onChange={(e) =>
                  setData({ ...data, accountNumber: e.target.value })
                }
                placeholder='Enter Account number'
              />
              <Input
                label='IFSC Code'
                type='text'
                value={userBankData?.banks?.[0]?.IFSCCode}
                disabled
                name='IFSCCode'
                onChange={(e) =>
                  setData({ ...data, IFSCCode: e.target.value })
                }
                placeholder='Enter IFSC Code'
              />
              <Input
                label='Branch Name'
                type='text'
                value={userBankData?.banks?.[0]?.branchName}
                disabled
                name='branchName'
                onChange={(e) =>
                  setData({ ...data, branchName: e.target.value })
                }
                placeholder='Enter Branch Name'
              />
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default UpdateWallet;
