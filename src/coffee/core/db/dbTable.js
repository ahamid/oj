// Generated by CoffeeScript 1.7.1
(function() {
  (function(OJ) {
    'use strict';
    var createTable, createTableImpl, dropTable, dropTableImpl;
    OJ.db.makeSubNameSpace('table');
    createTableImpl = function(deferred, dbManager, tableName, tablePkColumnName, autoIncrement) {

      /*
      @param db {IDBDatabase} An IDBDatabase instance
       */
      dbManager.schemaScripts.push(function(db) {
        var e, table;
        try {
          table = db.createObjectStore(tableName, {
            keyPath: tablePkColumnName,
            autoIncrement: false !== autoIncrement
          });
          dbManager.tables.add(tableName, table);
          deferred.resolve(table);
        } catch (_error) {
          e = _error;
          console.log(e, e.stack);
          deferred.reject(new Error("Could not create a new table", e));
        }
        return dbManager.tables[tableName];
      });
      return deferred.promise;
    };
    createTable = function(dbManager, tableName, tablePkColumnName, autoIncrement) {
      var deferred;
      deferred = Q.defer();
      return createTableImpl(deferred, dbManager, tableName, tablePkColumnName, autoIncrement);
    };
    OJ.db.table.register("create", createTable);
    dropTableImpl = function(deferred, dbManager, tableName) {

      /*
      @param db {IDBDatabase} An IDBDatabase instance
       */
      dbManager.schemaScripts.push(function(db) {
        var e;
        try {
          db.deleteObjectStore(tableName);
          delete dbManager.schema[tableName];
          deferred.resolve();
        } catch (_error) {
          e = _error;
          console.log(e, e.stack);
          deferred.reject(new Error("Could not create a new table", e));
        }
        return true;
      });
      return deferred.promise;
    };
    dropTable = function(dbManager, tableName) {
      var deferred;
      deferred = Q.defer();
      return dropTableImpl(deferred, dbManager, tableName);
    };
    OJ.db.table.register("drop", dropTable);
  })((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=dbTable.map