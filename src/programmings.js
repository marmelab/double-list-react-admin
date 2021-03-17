import { makeStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DragHandle from "@material-ui/icons/DragHandle";
import * as React from "react";
import {
  Datagrid,
  DatagridBody,
  Filter,
  List,
  ResourceContextProvider,
  TextField,
  TextInput,
  useDataProvider,
} from "react-admin";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const TeaserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Title" source="title" alwaysOn />
  </Filter>
);

const ProgrammingFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Title" source="title" alwaysOn />
  </Filter>
);

const DraggableDataGridRow = ({ record, resource, id, children, basePath }) => {
  // DatagridBody don't return the index of record map
  return (
    <Draggable draggableId={id.toString()} key={id} index={record.index}>
      {(dragProvided) => (
        <div
          aria-roledescription="Draggable item. Press space bar to lift"
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
        >
          <TableRow>
            {React.Children.map(children, (field, index) => {
              // custom header column
              if (index === 0) {
                return (
                  <TableCell key={`${id}-${field.props.source}`}>
                    <div {...dragProvided.dragHandleProps}>
                      <DragHandle />
                    </div>
                  </TableCell>
                );
              }

              return (
                <TableCell key={`${id}-${field.props.source}`}>
                  {React.cloneElement(field, {
                    record,
                    basePath,
                    resource,
                  })}
                </TableCell>
              );
            })}
          </TableRow>
        </div>
      )}
    </Draggable>
  );
};

const DraggableDataGridBody = ({ droppableId, isDropDisabled, ...props }) => (
  <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        <DatagridBody {...props} row={<DraggableDataGridRow />} />
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const DraggableDataGrid = ({ droppableId, isDropDisabled, ...props }) => (
  <Datagrid
    {...props}
    body={
      <DraggableDataGridBody
        droppableId={droppableId}
        isDropDisabled={isDropDisabled}
      />
    }
  />
);

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  programmingList: {
    flex: "1 0 0",
  },
  teaserList: {
    flex: "0 0 500px",
    marginLeft: 20,
  },
});

export function ProgrammingList(props) {
  const classes = useStyles();
  const dataProvider = useDataProvider();

  const onDragEnd = ({ destination, source, draggableId }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }

    // dropped in same list
    if (source.droppableId === "programmings") {
      dataProvider.update("programmings", {
        id: draggableId,
        data: { index: destination.index },
      });
    }

    // dropped in 'programmings' list
    if (source.droppableId === "teasers") {
      dataProvider.create("programmings", {
        id: draggableId,
        index: destination.index,
      });
    }
  };

  // sync second list location? use syncWithLocation props on list
  return (
    <div className={classes.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.programmingList}>
          <List
            {...props}
            filters={<ProgrammingFilter />}
            sort={{ field: "index", order: "ASC" }}
            exporter={false}
            bulkActionButtons={false}
            pagination={false}
          >
            <DraggableDataGrid
              droppableId="programmings"
              isDropDisabled={false}
            >
              <TextField source="id" />
              <TextField source="title" />
            </DraggableDataGrid>
          </List>
        </div>
        <div className={classes.teaserList}>
          <ResourceContextProvider value="teasers">
            <List
              basePath="/teasers"
              filters={<TeaserFilter />}
              exporter={false}
              bulkActionButtons={false}
            >
              <DraggableDataGrid droppableId="teasers" isDropDisabled={true}>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="description" />
              </DraggableDataGrid>
            </List>
          </ResourceContextProvider>
        </div>
      </DragDropContext>
    </div>
  );
}
