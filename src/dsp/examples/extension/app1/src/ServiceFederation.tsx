import React from "react";
import { BrowserRouter, Route, Link, Routes, useParams } from "react-router-dom";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

import ServiceLoader from './ServiceLoader';

const Hello: React.FC<any> = () => <>Hello</>
const Loading: React.FC = () => <>Loading Service</>
const NotFound: React.FC = () => <>Not Found</>
const Error: React.FC = () => <>Error</>

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const getServices = () => {
  const { loading, error, data } = useQuery(gql`
    {
      services {
        id
        name
        info
        slug
        manifest {
          id
          name
          url
          scope
          module
        }
      }
    }
  `);
  return { loading, error, data };
};

const getService = (id: number) => {
  const { loading, error, data } = useQuery(gql`
  { 
    service(id: {id}) {
      id
        name
        info
        slug
        manifest {
          id
          name
          url
          scope
          module
        }
    }
  }
  `);
  return { loading, error, data };
};

const Service: React.FC<any> = () => {
  const { serviceSlug } = useParams();
  const { loading, error, data } = getServices();
  if (error) {
    return <Error />
  }
  if (loading) {
    return <Loading />
  }
  const services = data.services;
  const s1 = services[0];
  if (!s1) {
    return <NotFound />
  }
  return <ServiceLoader service={s1} />
}

const ServiceFederation: React.FC<any> = () => 
  <ApolloProvider client={client as any}>
    <BrowserRouter>
      <Routes>
        <header>
          <Link to={"/auth/show"}>Load Auth Component</Link>
        </header>
        <Route path="/" element={<Hello/>} />
        <Route path="/:serviceSlug/*" element={<Service/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>

export default ServiceFederation;
