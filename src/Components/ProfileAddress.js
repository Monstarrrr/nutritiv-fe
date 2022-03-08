import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import nutritivApi, { 
  } from '../Api/nutritivApi'
import { 
  updateUserAddresses,
} from '../Redux/reducers/user'

const fields = {
  street: "Street",
  zip: "Postal code",
  city: "City",
  country: "Country",
  phoneNumber: "Phone number"
}
const isNumberField = ["zip", "phoneNumber"]

export const ProfileAddress = () => {
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const selectorUserAddresses = useSelector(state => state.user.addresses)
  const [userAddresses, setUserAddresses] = useState([])
  const [addressInput, setAddressInput] = useState({
    [fields.street]: "",
    [fields.zip]: "",
    [fields.city]: "",
    [fields.country]: "",
    [fields.phoneNumber]: ""
  })
  const [addressToDelete, setAddressToDelete] = useState(null)
  
  console.log('# userAddresses :', userAddresses)

  // GET USER ADDRESSES FROM REDUX
  useEffect(() => {
    setUserAddresses(selectorUserAddresses)
  }, [selectorUserAddresses]);
  
  // DELETE ADDRESS
  useEffect(() => {
    async function fetchApi() {
      try {
        const { data } = await nutritivApi.delete(
          `/users/removeAddress/${addressToDelete}`
        )
        dispatch(updateUserAddresses({
          addresses: data.addressDetails,
        }))
      } catch (err) {
        console.log('# /users/removeAddress :', err) 
      }
    }
    if(isFirstRender.current) {
      isFirstRender.current = false
      return;
    }
    fetchApi();
  }, [addressToDelete, dispatch]);

  // ## HANDLERS ##
  
  // ADDRESS INPUT CHANGE
  const handleChange = async (e) => {
    setAddressInput({
      ...addressInput,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitAddAddress = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await nutritivApi.put(
        `/users/addAddress/`,
        addressInput
      )
      dispatch(updateUserAddresses({
        addresses: data.userInfo.addressDetails,
      }))
    } catch(err) {
      console.log(err)
    }
  }
  
  const handleDeleteAddress = (e) => {
    setAddressToDelete(e.target.name)
  }
  
  return (
    <div>
      <h3>
        Add address
      </h3>
      <form onSubmit={handleSubmitAddAddress}>
        {
          Object.keys(fields).map((field, i) => (
            <React.Fragment key={i}>
              <label htmlFor={field}>
                {fields[field]}:
              </label>
              <br />
              <input
                name={field}
                onChange={handleChange}
                placeholder="..."
                type={
                  isNumberField.includes(field) ? "number" : "text"
                }
                value={addressInput?.field}
              />
              <br />
            </React.Fragment>
          ))
        }
        <input type="submit" value="Add address" />
      </form>
      <br />
      <div>
      {
        userAddresses.length !== 0 ? (
          userAddresses.map((address, i) => (
            <React.Fragment key={address._id}>
              <details>
                <summary>Address {i+1}</summary>
                <span>{address.country}</span>
                <br />
                <span>{address.city}</span>
                <br />
                <span>{address.zip}</span>
                <br />
                <span>{address.street}</span>
                <br />
                <span>{address.phoneNumber}</span>
              </details>
              <button 
                name={address._id}
                onClick={handleDeleteAddress}
              >
                Delete address
              </button>
            </React.Fragment>
          ))
        ) : (
          <span>
            No address registered.
          </span>
        )
      }
      </div>
    </div>
  )
}
