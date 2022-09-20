import { gql } from "@apollo/client";

export const CLEAR_NOTIFICATIONS = gql`
  mutation {
    clearNotification
  }
`;

export const MARK_READ = gql`
  mutation ($id: Int!) {
    markRead(input: { id: $id }) {
      id
      orderId
      orderType
      status
      orderDescription
      hyperLink
      createdTime
      userId
      langCode
    }
  }
`;
