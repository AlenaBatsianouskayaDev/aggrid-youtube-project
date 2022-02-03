export const tableHeader = [
  { 
    headerName: '', 
    field: 'preview', 
    checkboxSelection: true,
  },
  { 
    headerName: 'Published on', 
    field: 'publishedOn', 
  },
  { 
    headerName: 'Video Title', 
    field: 'videoTitle', 
    cellRenderer: function(params: any) {
      return '<a https://www.youtube.com/watch?v=XXXX target="_blank">'+ params.value+'</a>'
  }
  },
  { 
    headerName: 'Description', 
    field: 'description', 
  }
];