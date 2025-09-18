import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableVirtuoso } from "react-virtuoso";

const ROW_HEIGHT = 48; // standard MUI table row height

const SharedApplicationsTable = ({ apps, loading, error }) => {
  if (loading) {
    return (
      <Box py={6} textAlign="center" color="text.secondary">
        Loading…
      </Box>
    );
  }

  if (!loading && apps.length === 0) {
    return (
      <Box py={6} textAlign="center" color="text.secondary">
        {error?.message || "No applications found"}
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, maxWidth: "100%" }}>
      <TableVirtuoso
        data={apps}
        fixedHeaderContent={() => (
          <TableRow
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paper,
              height: "48px",
              borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)",
            })}
          >
            {[
              { label: "Icon", align: "left" },
              { label: "Application Name", align: "left" },
              { label: "Package ID", align: "left" },
              { label: "URL", align: "left" },
              { label: "Version", align: "center" },
              { label: "Actions", align: "center" },
            ].map(({ label, align }, index) => (
              <TableCell
                key={index}
                align={align}
                sx={(theme) => ({
                  padding: theme.spacing(1.25, 2), // 10px 16px
                  fontSize: theme.typography.body2.fontSize,
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper,
                  borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                })}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        )}
        components={{
          Table: (props) => (
            <Table
              {...props}
              stickyHeader
              size="small"
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0 4px",
                tableLayout: "fixed",
              }}
            />
          ),
          TableHead,
          TableBody,
          TableRow: (props) => (
            <TableRow
              {...props}
              hover
              tabIndex={-1}
              sx={{ height: ROW_HEIGHT, boxSizing: "border-box" }}
            />
          ),
        }}
        itemContent={(index, app) => (
          <>
            {/* Icon */}
            <TableCell
              sx={{
                padding: 0,
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)",
                background: "#FFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  height: "48px",
                  padding: "10px 16px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignSelf: "stretch",
                  width: "100%",
                }}
              >
                {app.showIcon ? (
                  <Avatar
                    variant="rounded"
                    src={
                      app.iconId
                        ? `/rest/public/icon/${app.iconId}`
                        : undefined
                    }
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "grey.200",
                      color: "grey.700",
                    }}
                  >
                    {app.name?.charAt(0)}
                  </Avatar>
                )}
              </Box>
            </TableCell>

            {/* Application Name */}
            <TableCell
              sx={{
                padding: 0,
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)",
                background: "#FFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  height: "48px",
                  fontWeight: 400,
                  color: "text.primary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {app.name}
              </Box>
            </TableCell>

            {/* Package ID */}
            <TableCell
              sx={{
                padding: 0,
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)",
                background: "#FFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px", fontWeight: 400,
                  padding: "10px 16px",
                  height: "48px",
                  color: "text.primary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {app.pkg}
              </Box>
            </TableCell>

            {/* URL */}
            <TableCell
              sx={{
                padding: 0,
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)",
                background: "#FFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  height: "48px",
                  maxWidth: 160, fontWeight: 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {app.url || "—"}
              </Box>
            </TableCell>

            {/* Version */}
            <TableCell
              sx={{
                padding: 0,
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)",
                background: "#FFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  height: "48px",
                  padding: "10px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  alignSelf: "stretch", fontWeight: 400,
                  width: "100%",
                }}
              >
                {app.version || "—"}
              </Box>
            </TableCell>

            {/* Actions */}
            <TableCell
              sx={{
                padding: 0,
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)",
                background: "#FFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  height: "48px",
                  padding: "10px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch", fontWeight: 400,
                  gap: 0.5,
                  width: "100%",
                }}
              >
                <Tooltip title="Edit">
                  <IconButton size="small" sx={{ padding: 0.5, marginRight: 0 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error" sx={{ padding: 0.5, marginLeft: 0 }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
          </>
        )}
      />
    </Box>
  );
};

export default SharedApplicationsTable;
