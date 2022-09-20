import React, { useState, useMemo, useRef, useEffect } from "react";
import BellIcon from "react-bell-icon";
import "./notifications.css";
import newN from "../Images/download.png";
import leftIcon from "../Images/left-icon.jpg";
import rightIcon from "../Images/right-icon.jpg";
import infoIcon from "../Images/info.png";
import { useTranslation, Trans } from "react-i18next";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { LOAD_NOTIFICATIONS } from "../GraphQL/Queries";
import { CLEAR_NOTIFICATIONS, MARK_READ } from "../GraphQL/Mutations";
import { useNavigate } from "react-router-dom";
import onClickOutside from "react-onclickoutside";

function Notifications() {
  const navigate = useNavigate();
  const [showCount, setShowCount] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [offset, setOffset] = useState(-1);
  const [offColl, setOffColl] = useState([0]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let PageSize = 5;

  // Notifications.handleClickOutside = () => setShow(false);

  const { t } = useTranslation();

  // Useref for the overlay
  const ref = useRef(null);
  const [getNotifications, { loading, data }] = useLazyQuery(
    LOAD_NOTIFICATIONS,
    {
      fetchPolicy: "network-only",
      variables: { count: 5 },
    }
  ); // fetch policy is to not look for cache and take the data from network only

  const [markNotificationRead, { read, updatedData }] = useMutation(MARK_READ);

  const [clearNotification, { result, clearing, error }] =
    useMutation(CLEAR_NOTIFICATIONS);

  // Handle the click on the notification bell
  const handleClick = (event) => {
    setShow(!show);
    setOffColl([0]);
    setCurrentPage(1);
    setTarget(event.target);
  };

  useEffect(() => {
    getNotifications();
    if (show == false) {
      const interval = setInterval(() => {
        getNotifications();
        setOffColl([0]);
        setCurrentPage(1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [show]);

  useEffect(() => {
    if (data != null) {
      if (offColl.indexOf(data.simpleNotifications.nextOffset) == -1)
        setOffColl((offColl) => [
          ...offColl,
          data.simpleNotifications.nextOffset,
        ]);
      setOffset(data.simpleNotifications.nextOffset);
      if (
        data.simpleNotifications.notifications != null &&
        data.simpleNotifications.notifications.length > 0
      ) {
        setItems(data.simpleNotifications.notifications);

        let newNotifi = data.simpleNotifications.notifications.filter(
          (item) => item.status == false
        ).length;
        setMessageCount(newNotifi);
        if (newNotifi == 0) {
          setShowCount(false);
        } else {
          setShowCount(true);
        }
      }
    }
  }, [data]);

  // const currentData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return items != null ? items.slice(firstPageIndex, lastPageIndex) : null;
  // }, [currentPage, show]);

  const handleClearNotification = (event) => {
    clearNotification();
    getNotifications();
  };

  const handleClickNotification = (notification) => {
    markNotificationRead({ variables: { id: notification.id } });
    navigate("payment");
  };

  const handlePrevPage = () => {
    let index = offColl.indexOf(offset);
    setCurrentPage((prev) => prev - 1);
    getNotifications({ variables: { offset: offColl[index - 2] } });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    getNotifications({ variables: { offset: offset } });
  };

  // Hide the notification on clicking outside
  const hide = () => {
    setShow(false);
  };

  const setDummyData = () => {
    const listNotifications = [
      {
        id: 34567,
        orderType: "Notification 1",
        orderDescription: "This is notification detail",
        status: false,
        createdTime: "2022-09-12T11:48:19+05:30",
      },
      {
        id: 12345,
        orderType: "Notification 2",
        orderDescription: "This is notification detail",
        status: false,
        createdTime: "2022-09-12T09:48:19+05:30",
      },
      {
        id: 34566,
        orderType: "Notification 3",
        orderDescription: "This is notification detail",
        status: false,
        createdTime: "2022-09-11T11:48:19+05:30",
      },
      {
        id: 34561,
        orderType: "Notification 4",
        orderDescription: "This is notification detail",
        status: true,
        createdTime: "2022-09-10T11:48:19+05:30",
      },
      {
        id: 34562,
        orderType: "Notification 5",
        orderDescription: "This is notification detail",
        status: true,
        createdTime: "2022-09-09T11:48:19+05:30",
      },
      {
        id: 34564,
        orderType: "Notification 6",
        orderDescription: "This is notification detail",
        status: true,
        createdTime: "2022-09-09T11:48:19+05:30",
      },
      {
        id: 34565,
        orderType: "Notification 7",
        orderDescription: "This is notification detail",
        status: true,
        createdTime: "2022-09-09T11:48:19+05:30",
      },
      {
        id: 34587,
        orderType: "Notification 8",
        orderDescription: "This is notification detail",
        status: true,
        createdTime: "2022-09-09T11:48:19+05:30",
      },
    ];

    setItems(listNotifications);
  };

  const getTimeDiff = (timeStamp) => {
    let today = new Date();
    // let timeStamp = new Date("2022-09-10T11:38:19+05:30");
    timeStamp = new Date(timeStamp);

    let totalDays = Math.abs((today - timeStamp) / (1000 * 3600 * 24));
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let monthIndex = timeStamp.getMonth();
    let monthName = monthNames[monthIndex];

    const hours = parseInt(
      (Math.abs(today - timeStamp) / (1000 * 60 * 60)) % 24
    );
    const minutes = parseInt(
      (Math.abs(today.getTime() - timeStamp.getTime()) / (1000 * 60)) % 60
    );

    if (totalDays > 1) {
      return `${timeStamp.getDate()} ${monthName} ${timeStamp
        .getFullYear()
        .toString()
        .substring(2)}`;
    } else {
      if (hours <= 0) {
        if (minutes < 1) {
          return "now";
        }
        return `${minutes}m`;
      } else {
        return `${hours}h`;
      }
    }
  };

  return (
    <>
      <div className="notification-container">
        <div
          className={`notification ${
            showCount ? "notify show-count" : "notify"
          }`}
          //   style={{ backgroundColor: theme.backgroundColor }}
          data-count={messageCount}
          onClick={(event) => handleClick(event)}
        >
          <BellIcon active={true} /> 
        </div>
      </div>
       
      {show && (
        <div
          className={items.length > 0 ? "notification-list" : "no-notification"}
        >
          <h4 className="notification-header">{t("notifications.header")}</h4>
          <div className="display-notifications">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  className={`display-item ${
                    item.status == false ? "active" : ""
                  }`}
                  onClick={() => {
                    handleClickNotification(item);
                  }}
                >
                  <div className="icon">
                    <img src={infoIcon} width="20px"></img>
                  </div>
                  <div className="item">
                    <div className="item-id">{item.id}</div>
                    <div className="item-title">{item.orderType}</div>
                    <div className="item-details">{item.orderDescription}</div>
                  </div>
                  <div className="time">
                    {getTimeDiff(item.createdTime)}
                    {item.status == false && (
                      <span>
                        <img src={newN} width="15px"></img>
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>{t("notifications.nonewnotifications")}</div>
            )}
          </div>

          <div>
            {offColl.indexOf(offset) > 1 && (
              <img
                src={leftIcon}
                width="15px"
                onClick={() => {
                  handlePrevPage();
                }}
                className="img-page"
              ></img>
            )}
            {!(currentPage == 1 && offset == -1) && (
              <span className="currentPage">{currentPage}</span>
            )}
            {offset > -1 && (
              <img
                src={rightIcon}
                width="15px"
                onClick={() => {
                  handleNextPage();
                }}
                className="img-page"
              ></img>
            )}
          </div>

          <div>
            {items.length > 0 &&
              items.filter((item) => item.status == false).length > 0 && (
                <button
                  className="clear-notifications"
                  onClick={(event) => {
                    handleClearNotification(event);
                  }}
                >
                  {t("notifications.clearNotifications")}
                </button>
              )}
          </div>
        </div>
      )}
    </>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Notifications.handleClickOutside,
};

// export default onClickOutside(Notifications, clickOutsideConfig);
export default Notifications;
