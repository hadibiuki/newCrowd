export const CandidateDirectReconcileSchema = gql`
  mutation CandidateDirectReconcile($id: ID!) {
    CandidateDirectReconcile(id: $id)
  }
`;
