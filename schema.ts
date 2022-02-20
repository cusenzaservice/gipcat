import { list, graphql } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  integer,
  select,
} from '@keystone-6/core/fields';

export const lists = {
  User: list({
    fields: {
      // username
      username: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      // name and surname
      legalName: text({
        isFilterable: true,
      }),
      // auth and permissions
      password: password({ validation: { isRequired: true } }),
      role: select({
        type: 'integer',
        options: [
          { label: 'Cliente', value: 1 },
          { label: 'Tecnico', value: 2 },
          { label: 'Operatore', value: 3 },
          { label: 'Amministratore', value: 4 },
          { label: 'Operatore (Sola Lettura)', value: 5 },
        ]
      }),
      // id customer
      idCustomer: integer(),
      // technichian color
      color: text({
        validation: {
          match: {
            regex: RegExp("^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$")
          }
        }
      }),
    },
    ui: {
      listView: {
        initialColumns: ['username', 'legalName'],
      },
    },
  }),
};
