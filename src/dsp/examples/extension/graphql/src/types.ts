export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateServiceInput = {
  readonly manifestId: Scalars['Int'];
  readonly name: Scalars['String'];
};

export type Manifest = {
  readonly __typename?: 'Manifest';
  readonly id: Scalars['Int'];
  readonly module: Scalars['String'];
  readonly name: Scalars['String'];
  readonly scope: Scalars['String'];
  readonly url: Scalars['String'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly createService: Maybe<Service>;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly manifest: Maybe<Manifest>;
  readonly manifests: Maybe<ReadonlyArray<Maybe<Manifest>>>;
  readonly service: Maybe<Service>;
  readonly services: Maybe<ReadonlyArray<Maybe<Service>>>;
};


export type QueryManifestArgs = {
  id: Maybe<Scalars['Int']>;
};


export type QueryServiceArgs = {
  id: Maybe<Scalars['Int']>;
};

export type Service = {
  readonly __typename?: 'Service';
  readonly id: Scalars['Int'];
  readonly info: Scalars['String'];
  readonly manifest: Manifest;
  readonly name: Scalars['String'];
  readonly slug: Scalars['String'];
};

