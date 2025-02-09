import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoginPayload } from '../Modals/Modals';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../hook';
import { loaderStart, loaderStop } from '../Store/slices/ProductSlice';
import { ApisRoutes } from '../Services/apiRoutes';
import { updateToken } from '../Store/slices/LoginSlice';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
  } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  async function onSubmit(body: LoginPayload) {
    dispatch(loaderStart())
    try {
      let res = await ApisRoutes.loginAdmin(body)
      dispatch(updateToken(res))
      navigate('/')
      toast.success('You are login successfully.')

    } catch (err: any) {
      let error = err.response.data.message
      toast.error(error)
    } finally {
      dispatch(loaderStop())
    }

  }


  return (
    <>
      <section
        className="w-100 row justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-md-5 col-11">
          <form onSubmit={handleSubmit(onSubmit, () => toast.error("Please fill all mandatory data!"))}>
            <figure className="border rounded p-4">
              <div className="fs-4 fw-500 text-center">Login</div>

              <div className="row mt-4">
                <div className="col-12">
                  <label className="form-label">Username<span className="text-danger">*</span></label>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your username"
                          value={value}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </div>
                <div className="col-12 mt-4">
                  <label className="form-label">Password<span className="text-danger">*</span></label>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue={''}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value={value}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </div>
                <div className="col-12 mt-4">
                  <button className="btn btn-primary w-100">Login</button>
                  <Link to='/' className="f-12 text-dark">Back to home</Link>
                </div>
              </div>
            </figure>
          </form>
        </div>
      </section>
    </>
  )
}
