import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCandidateCandidate extends Schema.CollectionType {
  collectionName: 'candidates';
  info: {
    singularName: 'candidate';
    pluralName: 'candidates';
    displayName: 'candidate';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    email: Attribute.Email;
    dob: Attribute.Date & Attribute.DefaultTo<'1994-04-27'>;
    male: Attribute.Boolean;
    southafrican: Attribute.Boolean;
    province: Attribute.String;
    city: Attribute.String;
    homelanguage: Attribute.String;
    highestqualification: Attribute.String;
    nextofkin: Attribute.String;
    postalcode: Attribute.Integer;
    currentlystudying: Attribute.Boolean;
    githublink: Attribute.String;
    linkedinlink: Attribute.String;
    previouscompany1: Attribute.String;
    previouscompany2: Attribute.String;
    company1position: Attribute.String;
    company2position: Attribute.String;
    termofcontractcompany1: Attribute.Integer;
    termofcontractcompany2: Attribute.Integer;
    Program: Attribute.String;
    idnumber: Attribute.String;
    phonenumber: Attribute.String;
    nextofkinnumber: Attribute.String;
    imageurl: Attribute.String;
    physicaladdress: Attribute.RichText;
    keyresponsibilitiescompany1: Attribute.RichText;
    keyresponsibilitiescompany2: Attribute.RichText;
    postaladdress: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::candidate.candidate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::candidate.candidate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCohortCohort extends Schema.CollectionType {
  collectionName: 'cohorts';
  info: {
    singularName: 'cohort';
    pluralName: 'cohorts';
    displayName: 'cohort';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.RichText;
    skill1: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill2: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill3: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill4: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill5: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill6: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill7: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill1_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill2_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill3_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill4_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill5_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill6_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill7_icon: Attribute.Enumeration<
      [
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/django-icon.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/css-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/html-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/angular-solid.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/bootstrap-wordmark.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/database.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/javascript-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/machine-learning.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/powerbi.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/python-fill.svg',
        'https://raw.githubusercontent.com/phaks323/recruit/298cfd642cf082d1733f578b39c39f3d5dc0cf53/react-line.svg'
      ]
    >;
    skill1_description: Attribute.RichText;
    skill2_description: Attribute.RichText;
    skill3_description: Attribute.RichText;
    skill4_description: Attribute.RichText;
    skill5_description: Attribute.RichText;
    skill6_description: Attribute.RichText;
    skill7_description: Attribute.RichText;
    teams: Attribute.Relation<
      'api::cohort.cohort',
      'manyToMany',
      'api::team.team'
    >;
    projects: Attribute.Relation<
      'api::cohort.cohort',
      'manyToMany',
      'api::project.project'
    >;
    teamleaders: Attribute.Relation<
      'api::cohort.cohort',
      'manyToMany',
      'api::teamleader.teamleader'
    >;
    learners: Attribute.Relation<
      'api::cohort.cohort',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cohort.cohort',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cohort.cohort',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCommunicationratingdescriptionCommunicationratingdescription
  extends Schema.CollectionType {
  collectionName: 'communicationratingdescriptions';
  info: {
    singularName: 'communicationratingdescription';
    pluralName: 'communicationratingdescriptions';
    displayName: 'Communicationratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::communicationratingdescription.communicationratingdescription',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::communicationratingdescription.communicationratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::communicationratingdescription.communicationratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactsQuestionContactsQuestion
  extends Schema.CollectionType {
  collectionName: 'contacts_questions';
  info: {
    singularName: 'contacts-question';
    pluralName: 'contacts-questions';
    displayName: 'Contacts-question';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.RichText;
    option: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contacts-question.contacts-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contacts-question.contacts-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInterpersonalratingdescriptionInterpersonalratingdescription
  extends Schema.CollectionType {
  collectionName: 'interpersonalratingdescriptions';
  info: {
    singularName: 'interpersonalratingdescription';
    pluralName: 'interpersonalratingdescriptions';
    displayName: 'Interpersonalratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    learners: Attribute.Relation<
      'api::interpersonalratingdescription.interpersonalratingdescription',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interpersonalratingdescription.interpersonalratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interpersonalratingdescription.interpersonalratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLeadershipratingdescriptionLeadershipratingdescription
  extends Schema.CollectionType {
  collectionName: 'leadershipratingdescriptions';
  info: {
    singularName: 'leadershipratingdescription';
    pluralName: 'leadershipratingdescriptions';
    displayName: 'Leadershipratingdescription';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::leadershipratingdescription.leadershipratingdescription',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::leadershipratingdescription.leadershipratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::leadershipratingdescription.leadershipratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLearnerLearner extends Schema.CollectionType {
  collectionName: 'learners';
  info: {
    singularName: 'learner';
    pluralName: 'learners';
    displayName: 'Learner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    province: Attribute.String;
    email: Attribute.Email;
    dob: Attribute.Date;
    southafrican: Attribute.Boolean;
    male: Attribute.Boolean;
    city: Attribute.String;
    physicaladdress: Attribute.RichText;
    postaladdress: Attribute.RichText;
    homelanguage: Attribute.String;
    highestqualification: Attribute.String;
    nextofkin: Attribute.String;
    postalcode: Attribute.Integer;
    currentlystudying: Attribute.Boolean;
    githublink: Attribute.String;
    linkedinlink: Attribute.String;
    previouscompany1: Attribute.String;
    previouscompany2: Attribute.String;
    company1position: Attribute.String;
    company2position: Attribute.String;
    termofcontractcompany1: Attribute.Integer;
    termofcontractcompany2: Attribute.Integer;
    keyresponsibilitiescompany1: Attribute.RichText;
    keyresponsibilitiescompany2: Attribute.RichText;
    Program: Attribute.String;
    idnumber: Attribute.String;
    phonenumber: Attribute.String;
    nextofkinnumber: Attribute.String;
    imageurl: Attribute.String;
    communicationratingdescriptions: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::communicationratingdescription.communicationratingdescription'
    >;
    interpersonalratingdescriptions: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::interpersonalratingdescription.interpersonalratingdescription'
    >;
    leadershipratingdescriptions: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::leadershipratingdescription.leadershipratingdescription'
    >;
    teamworkratingdescriptions: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::teamworkratingdescription.teamworkratingdescription'
    >;
    problemsolvingratingdescriptions: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::problemsolvingratingdescription.problemsolvingratingdescription'
    >;
    techskillsratingdescriptions: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::techskillsratingdescription.techskillsratingdescription'
    >;
    responsibilities: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::responsibilitie.responsibilitie'
    >;
    cohorts: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::cohort.cohort'
    >;
    teams: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::team.team'
    >;
    shaperreviews: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::shaperreview.shaperreview'
    >;
    teamleaders: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::teamleader.teamleader'
    >;
    softskilldescriptions: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::softskilldescription.softskilldescription'
    >;
    softskillratings: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::softskillrating.softskillrating'
    >;
    projects: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::project.project'
    >;
    techskillratings: Attribute.Relation<
      'api::learner.learner',
      'manyToMany',
      'api::techskillrating.techskillrating'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::learner.learner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::learner.learner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPersonalQuestionPersonalQuestion
  extends Schema.CollectionType {
  collectionName: 'personal_questions';
  info: {
    singularName: 'personal-question';
    pluralName: 'personal-questions';
    displayName: 'Personal-question';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.RichText;
    option: Attribute.RichText;
    type: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::personal-question.personal-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::personal-question.personal-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProblemsolvingratingdescriptionProblemsolvingratingdescription
  extends Schema.CollectionType {
  collectionName: 'problemsolvingratingdescriptions';
  info: {
    singularName: 'problemsolvingratingdescription';
    pluralName: 'problemsolvingratingdescriptions';
    displayName: 'Problemsolvingratingdescription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::problemsolvingratingdescription.problemsolvingratingdescription',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::problemsolvingratingdescription.problemsolvingratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::problemsolvingratingdescription.problemsolvingratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    projectname: Attribute.String;
    problemstatement: Attribute.RichText;
    solution: Attribute.RichText;
    screenshot1explanation: Attribute.RichText;
    screenshot2explanation: Attribute.RichText;
    screenshot3explanation: Attribute.RichText;
    screenshot4explanation: Attribute.RichText;
    screenshot5explanation: Attribute.RichText;
    screenshot6explanation: Attribute.RichText;
    screenshot7explanation: Attribute.RichText;
    imageurl: Attribute.String;
    screenshot1_image: Attribute.String;
    screenshot2_image: Attribute.String;
    screenshot3_image: Attribute.String;
    screenshot4_image: Attribute.String;
    screenshot5_image: Attribute.String;
    screenshot6_image: Attribute.String;
    screenshot7_image: Attribute.String;
    cohorts: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::cohort.cohort'
    >;
    learners: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::learner.learner'
    >;
    teams: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::team.team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQualificationQuestionQualificationQuestion
  extends Schema.CollectionType {
  collectionName: 'qualification_questions';
  info: {
    singularName: 'qualification-question';
    pluralName: 'qualification-questions';
    displayName: 'Qualification-question';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.RichText;
    option: Attribute.RichText;
    type: Attribute.Enumeration<['Radio', 'Select', 'Text', 'Date', 'Number']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::qualification-question.qualification-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::qualification-question.qualification-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResponsibilitieResponsibilitie
  extends Schema.CollectionType {
  collectionName: 'responsibilities';
  info: {
    singularName: 'responsibilitie';
    pluralName: 'responsibilities';
    displayName: 'Responsibilitie';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    responsibility: Attribute.String;
    learners: Attribute.Relation<
      'api::responsibilitie.responsibilitie',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::responsibilitie.responsibilitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::responsibilitie.responsibilitie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShaperreviewShaperreview extends Schema.CollectionType {
  collectionName: 'shaperreviews';
  info: {
    singularName: 'shaperreview';
    pluralName: 'shaperreviews';
    displayName: 'Shaperreview';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    review: Attribute.RichText;
    learners: Attribute.Relation<
      'api::shaperreview.shaperreview',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shaperreview.shaperreview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shaperreview.shaperreview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSoftskilldescriptionSoftskilldescription
  extends Schema.CollectionType {
  collectionName: 'softskilldescriptions';
  info: {
    singularName: 'softskilldescription';
    pluralName: 'softskilldescriptions';
    displayName: 'Softskilldescription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    problemsolving_description: Attribute.RichText;
    interpersonal_description: Attribute.RichText;
    communication_description: Attribute.RichText;
    leadership_description: Attribute.RichText;
    teamwork_description: Attribute.RichText;
    learners: Attribute.Relation<
      'api::softskilldescription.softskilldescription',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::softskilldescription.softskilldescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::softskilldescription.softskilldescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSoftskillratingSoftskillrating
  extends Schema.CollectionType {
  collectionName: 'softskillratings';
  info: {
    singularName: 'softskillrating';
    pluralName: 'softskillratings';
    displayName: 'Softskillrating';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    problemsolving: Attribute.String;
    interpersonal: Attribute.String;
    communication: Attribute.String;
    leadership: Attribute.String;
    mostimproved: Attribute.String;
    teamwork: Attribute.String;
    learners: Attribute.Relation<
      'api::softskillrating.softskillrating',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::softskillrating.softskillrating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::softskillrating.softskillrating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamTeam extends Schema.CollectionType {
  collectionName: 'teams';
  info: {
    singularName: 'team';
    pluralName: 'teams';
    displayName: 'Team';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    cohorts: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::cohort.cohort'
    >;
    learners: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::learner.learner'
    >;
    projects: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::project.project'
    >;
    teamleaders: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::teamleader.teamleader'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTeamleaderTeamleader extends Schema.CollectionType {
  collectionName: 'teamleaders';
  info: {
    singularName: 'teamleader';
    pluralName: 'teamleaders';
    displayName: 'Teamleader';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    cohorts: Attribute.Relation<
      'api::teamleader.teamleader',
      'manyToMany',
      'api::cohort.cohort'
    >;
    learners: Attribute.Relation<
      'api::teamleader.teamleader',
      'manyToMany',
      'api::learner.learner'
    >;
    teams: Attribute.Relation<
      'api::teamleader.teamleader',
      'manyToMany',
      'api::team.team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::teamleader.teamleader',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::teamleader.teamleader',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamworkratingdescriptionTeamworkratingdescription
  extends Schema.CollectionType {
  collectionName: 'teamworkratingdescriptions';
  info: {
    singularName: 'teamworkratingdescription';
    pluralName: 'teamworkratingdescriptions';
    displayName: 'Teamworkratingdescription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::teamworkratingdescription.teamworkratingdescription',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::teamworkratingdescription.teamworkratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::teamworkratingdescription.teamworkratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTechskillratingTechskillrating
  extends Schema.CollectionType {
  collectionName: 'techskillratings';
  info: {
    singularName: 'techskillrating';
    pluralName: 'techskillratings';
    displayName: 'Techskillrating';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mostimproved: Attribute.Enumeration<
      [
        'ReactJS',
        'Python',
        'Machine Learning',
        'Databases',
        'SQL',
        'CSS',
        'Django',
        'Javascript',
        'HTML',
        'Angular',
        'Bootstrap',
        'Visualisation'
      ]
    >;
    skill1: Attribute.String;
    skill2: Attribute.String;
    skill3: Attribute.String;
    skill4: Attribute.String;
    skill5: Attribute.String;
    skill6: Attribute.String;
    skill7: Attribute.String;
    learners: Attribute.Relation<
      'api::techskillrating.techskillrating',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::techskillrating.techskillrating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::techskillrating.techskillrating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTechskillsratingdescriptionTechskillsratingdescription
  extends Schema.CollectionType {
  collectionName: 'techskillsratingdescriptions';
  info: {
    singularName: 'techskillsratingdescription';
    pluralName: 'techskillsratingdescriptions';
    displayName: 'Techskillsratingdescription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rating1: Attribute.RichText;
    rating2: Attribute.RichText;
    rating3: Attribute.RichText;
    rating4: Attribute.RichText;
    rating5: Attribute.RichText;
    learners: Attribute.Relation<
      'api::techskillsratingdescription.techskillsratingdescription',
      'manyToMany',
      'api::learner.learner'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::techskillsratingdescription.techskillsratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::techskillsratingdescription.techskillsratingdescription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::candidate.candidate': ApiCandidateCandidate;
      'api::cohort.cohort': ApiCohortCohort;
      'api::communicationratingdescription.communicationratingdescription': ApiCommunicationratingdescriptionCommunicationratingdescription;
      'api::contacts-question.contacts-question': ApiContactsQuestionContactsQuestion;
      'api::interpersonalratingdescription.interpersonalratingdescription': ApiInterpersonalratingdescriptionInterpersonalratingdescription;
      'api::leadershipratingdescription.leadershipratingdescription': ApiLeadershipratingdescriptionLeadershipratingdescription;
      'api::learner.learner': ApiLearnerLearner;
      'api::personal-question.personal-question': ApiPersonalQuestionPersonalQuestion;
      'api::problemsolvingratingdescription.problemsolvingratingdescription': ApiProblemsolvingratingdescriptionProblemsolvingratingdescription;
      'api::project.project': ApiProjectProject;
      'api::qualification-question.qualification-question': ApiQualificationQuestionQualificationQuestion;
      'api::responsibilitie.responsibilitie': ApiResponsibilitieResponsibilitie;
      'api::shaperreview.shaperreview': ApiShaperreviewShaperreview;
      'api::softskilldescription.softskilldescription': ApiSoftskilldescriptionSoftskilldescription;
      'api::softskillrating.softskillrating': ApiSoftskillratingSoftskillrating;
      'api::team.team': ApiTeamTeam;
      'api::teamleader.teamleader': ApiTeamleaderTeamleader;
      'api::teamworkratingdescription.teamworkratingdescription': ApiTeamworkratingdescriptionTeamworkratingdescription;
      'api::techskillrating.techskillrating': ApiTechskillratingTechskillrating;
      'api::techskillsratingdescription.techskillsratingdescription': ApiTechskillsratingdescriptionTechskillsratingdescription;
    }
  }
}
