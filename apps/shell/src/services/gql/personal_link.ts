export const PersonalLinkRequestMutationSchema = gql`
  mutation PersonalLinkRequest($otp_code: String, $username: String!) {
    PersonalLinkRequest(otp_code: $otp_code, username: $username) {
      id
      domain
    }
  }
`;
