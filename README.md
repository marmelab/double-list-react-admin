# Double list with drag and drop with less customize react admin

Nous voulons améliorer React Admin pour ce cas d'usage, pourvoir afficher deux listes avec du drag&drop entre elle.

## My notes

- DatagridBody don't return the index of record map (https://github.com/marmelab/react-admin/blob/master/packages/ra-ui-materialui/src/list/datagrid/DatagridBody.tsx#L40), react-beautiful-dnd need it.

- We can't customize the header easily, I use `index === 0` to display the DragHandle button instead of the id

- We can display two list easily with `<ResourceContextProvider />` and we also have the props `syncWithLocation` if needed.

## Conclusion

React Admin is not far from offering this functionality without having to customize a lot. The biggest difficulty is to manage the drag & drop logic on API side.
