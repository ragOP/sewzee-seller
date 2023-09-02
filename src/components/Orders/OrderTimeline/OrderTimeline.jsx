import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { HandleTimelineData } from "../../../helper/IconHandler";

const OrderTimeline = ({ timelineData }) => {
    const getTimelineData = timelineData.map((item) => {
        return HandleTimelineData(item);
    });
    return (
        <Timeline position="alternate">
            {getTimelineData?.map((item, index) => (
                <TimelineItem key={index + 1}>
                    <TimelineOppositeContent
                        sx={{ m: "auto 0" }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                    >
                        {item?.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color={item?.color}>
                            {item?.icon}
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="h6" component="span">
                            {item?.title}
                        </Typography>
                        <Typography>{item?.description}</Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};

export default OrderTimeline;
