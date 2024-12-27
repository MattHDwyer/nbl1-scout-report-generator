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
import React, { useEffect, useState } from "react";
import "./DefensiveSchemes.css";
import Tiptap from "../../../../../../components/RTE/RTE";
import { Editor } from "@tiptap/core";
import { Transaction } from "@tiptap/pm/state";

interface DefensiveSchemesType {
  areaOfApplication: string[];
  primaryScheme: string[];
  changeUp: string[];
}

export const DefensiveSchemes: React.FC<{ teamId: string }> = ({ teamId }) => {
  const storageDefensiveSchemes = localStorage.getItem(
    `defensive-schemes-${teamId}`
  );
  const [defensiveSchemes, setDefensiveSchemes] =
    useState<DefensiveSchemesType>(
      storageDefensiveSchemes
        ? JSON.parse(storageDefensiveSchemes)
        : {
            areaOfApplication: [],
            primaryScheme: [],
            changeUp: [],
          }
    );

  const handleInputChange = (
    props: {
      editor: Editor;
      transaction: Transaction;
    },
    index: number,
    type: keyof DefensiveSchemesType
  ) => {
    const value = props.editor.getHTML();
    setDefensiveSchemes((prevState) => ({
      ...prevState,
      [type]: prevState[type].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleBlur = () => {
    localStorage.setItem(
      `defensive-schemes-${teamId}`,
      JSON.stringify(defensiveSchemes)
    );
  };

  return (
    <Box sx={{ borderTop: 1, paddingTop: "8px", width: 780 }}>
      <Typography variant="h5">DEFENSIVE SCHEMES</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ padding: "4px" }}
                onClick={() => {
                  setDefensiveSchemes((prevState) => ({
                    areaOfApplication: [...prevState.areaOfApplication, ""],
                    primaryScheme: [...prevState.primaryScheme, ""],
                    changeUp: [...prevState.changeUp, ""],
                  }));
                }}
              >
                <Typography variant="h6">AREA OF APPLICATION</Typography>
              </TableCell>
              <TableCell
                sx={{ padding: "4px" }}
                onClick={() => {
                  setDefensiveSchemes((prevState) => ({
                    areaOfApplication: prevState.areaOfApplication.slice(0, -1),
                    primaryScheme: prevState.primaryScheme.slice(0, -1),
                    changeUp: prevState.changeUp.slice(0, -1),
                  }));
                }}
              >
                <Typography variant="h6">PRIMARY SCHEME</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">CHANGE UP</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defensiveSchemes.areaOfApplication.map((cell, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: "4px 8px" }}>
                  <Tiptap
                    value={cell}
                    handleOnUpdate={(props) =>
                      handleInputChange(props, index, "areaOfApplication")
                    }
                    handleOnBlur={handleBlur}
                  />
                </TableCell>
                <TableCell sx={{ padding: "4px 8px" }}>
                  <Tiptap
                    value={defensiveSchemes.primaryScheme[index]}
                    handleOnUpdate={(props) =>
                      handleInputChange(props, index, "primaryScheme")
                    }
                    handleOnBlur={handleBlur}
                  />
                </TableCell>
                <TableCell sx={{ padding: "4px 8px" }}>
                  <Tiptap
                    value={defensiveSchemes.changeUp[index]}
                    handleOnUpdate={(props) =>
                      handleInputChange(props, index, "changeUp")
                    }
                    handleOnBlur={handleBlur}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
