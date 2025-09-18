export const FaqSchema = gql`
  query GetFaqs {
    Faqs {
      id
      title
      faqs {
        id
        slug
        question
        answer
        faq_department_id
      }
      created_at
      updated_at
    }
  }
`;
