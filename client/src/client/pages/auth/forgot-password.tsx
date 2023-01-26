//! This page is special, bcoz we have applied routes redirection using HOC

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ForgotPassword = () => {
  //? This function is for SEO
  const head = () => (
    <Helmet>
      <title>{`Trade - Get Your New Password`}</title>
      {/* // this is how we will make our title dynamic */}
      <meta property="og:title" content="Admins List"></meta>
      {/* // this title is for SEO -- to identify this page title  */}
      {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
      {/* //? https://ogp.me/ */}
    </Helmet>
  );

  return (
    <div>
      {head()}
      {/* I can place head() function anywhere, Helmet will automatically put it into head tag */}
      <h1 className="text-center my-5">Forgot Password Page</h1>
    </div>
  );
};

export default {
  component: ForgotPassword,
};
