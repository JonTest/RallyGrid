Ext.define('CustomApp', 
{
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:
    { 
        html:'<a href="https://help.rallydev.com/apps/2.0rc2/doc/">App SDK 2.0rc2 Docs</a>'
    },
    

    // Called by Rally Framework
    launch: function()
    {
        //Write app code here
        console.log("our first app woot!");
        
        // get the app's load data function
        this._loadData();
    },

    // Get Data from Rally
    _loadData: function()
    {
         // create instance of object
        var myStore = Ext.create('Rally.data.wsapi.Store', 
        {
            
            model: 'User Story',
            
            autoLoad: true,

            // events that fire on store
            listeners: 
            {
                // what to do when the store loads
                load: function(myStore, myData, success) 
                {
                    //process data
                    console.log("got data!", myStore, myData, success);

                    this._loadGrid(myStore);
                },

                // Pass app to listener block so the data gets printed correctly
                scope: this
            },

            // Data we're pulling from Rally. See wsapi docs
            fetch: ['FormattedID', 'Name', 'ScheduleState']

        });
    },

    // Create andshow a grid of given stories
    _loadGrid: function(myStore)
    {
        var myGrid = Ext.create("Rally.ui.grid.Grid", 
        {
            store: myStore,
            columnCfgs: ['FormattedID', 'Name', 'ScheduleState']
        });

        // Print the grid
        this.add(myGrid);

        console.log('my grid', myGrid);
    }

});
