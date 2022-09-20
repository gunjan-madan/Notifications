import { gql } from "@apollo/client";

export const LOAD_NOTIFICATIONS = gql`
  query getNotifications($count: Int, $offset: Int) {
    simpleNotifications(input: { count: $count, offset: $offset }) {
      notifications {
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
      nextOffset
      numberOfUnreadNotifications
    }
  }
`;
