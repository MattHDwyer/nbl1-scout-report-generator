import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import "./DepthChartTable.css";

type DepthChartObj = {
  [key: number]: Array<string>;
};

export const DepthChartTable: React.FC<{ teamId: string }> = ({ teamId }) => {
  const depthChartObj: DepthChartObj = {
    1: ["", ""],
    2: ["", ""],
    3: ["", ""],
    4: ["", ""],
    5: ["", ""],
  };
  const localStorageTeamDepth = localStorage.getItem(`depth-chart-${teamId}`);
  const [depthChart, setDepthChart] = React.useState<DepthChartObj>(
    localStorageTeamDepth ? JSON.parse(localStorageTeamDepth) : depthChartObj
  );

  return (
    <Box sx={{ borderTop: 1, paddingTop: "8px", width: 780 }}>
      <Typography variant="h5">Depth Chart</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(depthChart).map((key, index) => (
                <TableCell
                  key={index}
                  sx={{ textAlign: "center", padding: "4px" }}
                >
                  <Typography variant="h6">{key}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(depthChart).map((row, index) => (
              <TableRow key={index}>
                {Object.values(depthChart).map((cell, index) => (
                  <TableCell key={index} className="DepthChartCell">
                    <input
                      className="DepthChartInput"
                      value={depthChart[parseInt(row)][index]}
                      onChange={(e) => {
                        const updatedDepthChart = { ...depthChart };
                        updatedDepthChart[parseInt(row)][index] =
                          e.target.value;
                        setDepthChart(updatedDepthChart);
                      }}
                      onBlur={() => {
                        localStorage.setItem(
                          `depth-chart-${teamId}`,
                          JSON.stringify(depthChart)
                        );
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
