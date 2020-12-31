import { gql, useApolloClient, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { useMe } from '../../hooks/useMe';
import {
  verifyEmail,
  verifyEmailVariables,
} from '../../__generated__/verifyEmail';

const VERIFY_EMAIL = gql`
  mutation verifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`;

export const VerifyEmail = () => {
  const client = useApolloClient();
  const { data: meData } = useMe();
  const history = useHistory();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok, error },
    } = data;
    if (ok && meData?.me.id) {
      alert('Email verified.');
      client.writeFragment({
        id: `User:${meData?.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push('/');
    } else {
      console.log(error);
    }
  };
  const [
    verifyEmailMutation,
    { loading, data: verifyEmailMutationResult },
  ] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIL, {
    onCompleted,
  });
  const { register, getValues, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });
  const onSubmit = () => {
    if (!loading) {
      const { code } = getValues();
      verifyEmailMutation({
        variables: {
          verifyEmailInput: {
            code,
          },
        },
      });
    }
  };

  if (meData?.me.verified) {
    return <Redirect to='/' />;
  } else {
    return (
      <div className='h-screen py-10'>
        <div className='w-full max-w-screen-xl mx-auto px-5 2xl:px-0'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col items-center'
          >
            <input
              ref={register({ required: true })}
              className='input w-1/2'
              name='code'
              placeholder='이메일로부터 받은 코드를 입력'
            />
            <Button
              actionText='인증하기'
              canClick={formState.isValid}
              loading={loading}
            />
            {verifyEmailMutationResult?.verifyEmail.error && (
              <FormError
                errorMessage={verifyEmailMutationResult.verifyEmail.error}
              />
            )}
          </form>
        </div>
      </div>
    );
  }
};
