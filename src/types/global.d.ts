// export {};

// declare global {
//   // name	string	The identifying name of the contact person/organization.
//   // url	string	The URL for the contact information. This MUST be in the form of a URL.
//   // email	string	The email address of the contact person/organization. This MUST be in the form of an email address.
//   type ContactObject = {
//     name?: string;
//     url?: string;
//     email?: string;
//   };

//   // name	string	REQUIRED. The license name used for the API.
//   // url	string	A URL for the license used for the API. This MUST be in the form of a URL.
//   type LicenseObject = {
//     name: string;
//     url?: string;
//   };

//   // title	string	REQUIRED. The title of the API.
//   // description	string	A description of the API. CommonMark syntax MAY be used for rich text representation.
//   // termsOfService	string	A URL for the Terms of Service for the API. This MUST be in the form of a URL.
//   // contact	Contact Object	The contact information for the exposed API.
//   // license	License Object	The license information for the exposed API.
//   // version	string	REQUIRED. The version of the OpenAPI Document (which is distinct from the OpenAPI Specification version or the version of the API being described or the version of the OpenAPI Description).
//   interface InfoObject {
//     title: string;
//     description?: string;
//     termsOfService?: string;
//     contact?: ContactObject;
//     license?: LicenseObject;
//     version: string;
//   }

//   interface ServerObject {}

//   interface PathsObject {}

//   interface ComponentsObject {}

//   interface SecurityRequirementObject {}

//   interface TagObject {}

//   interface ExternalDocumentationObject {}

//   /**
//    * This is the root object of the (OpenAPI Description)[ https://swagger.io/specification/v3 ].
//    */
//   interface SwaggerOptions {
//     definition: {
//       /**
//        * This string MUST be the version number of the OpenAPI Specification that the OpenAPI Document uses.
//        * The openapi field SHOULD be used by tooling to interpret the OpenAPI Document.
//        * This is not related to the API info.version string.
//        */
//       openapi: string;

//       /**
//        * Provides metadata about the API.
//        * The metadata MAY be used by tooling as required.
//        */
//       info: InfoObject;

//       /**
//        * An array of Server Objects, which provide connectivity information to a target server.
//        * If the servers field is not provided, or is an empty array, the default value would be a Server Object with a url value of /.
//        */
//       servers?: ServerObject[];

//       /**
//        * The available paths and operations for the API.
//        */
//       paths: PathsObject;

//       /**
//        * An element to hold various Objects for the OpenAPI Description.
//        */
//       components?: ComponentsObject;

//       /**
//        * A declaration of which security mechanisms can be used across the API.
//        * The list of values includes alternative Security Requirement Objects that can be used.
//        * Only one of the Security Requirement Objects need to be satisfied to authorize a request.
//        * Individual operations can override this definition.
//        * The list can be incomplete, up to being empty or absent.
//        * To make security explicitly optional, an empty security requirement ({}) can be included in the array.
//        */
//       security?: SecurityRequirementObject[];

//       /**
//        * A list of tags used by the OpenAPI Description with additional metadata.
//        * The order of the tags can be used to reflect on their order by the parsing tools.
//        * Not all tags that are used by the Operation Object must be declared.
//        * The tags that are not declared MAY be organized randomly or based on the tools' logic.
//        * Each tag name in the list MUST be unique.
//        */
//       tags?: TagObject[];

//       /**
//        * Additional external documentation.
//        */
//       externalDocs: ExternalDocumentationObject;
//     };
//     apis: string[];
//   }
// }
