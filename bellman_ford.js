var max = 9999999;

var edge = {
	src: 0,
	dest: 0,
	weight: 0
}

var graph = {
	edges:[],
	vertices: 0,
	edge_number: 0,
	create: function(){
		for (i = 0; i < this.edge_number; i++) {
			// Initialize the graph with empty nodes			
			var new_edge = {src:0,dest:0};
			this.edges.push(new_edge);
		}
		return this;
	},
}
//Note: bellman ford is about examine the outgoing path of every node in V-1 iterations
//Node S,A,B,C,D, let local sum of path be LSOP, foreign sum of path be FSOP
//Start with starting node (S) with sum of path 0, update the FSOP of outgoing nodes with weights
//Then next node (A), if LSOP is not infinite, then update FSOP with weights, else skip
//Iterate through the rest of the edges with V-1 times, then you will get the lowest value to reach each node from S

function BellmanFord(graph, src) 
{ 
	var V = graph.vertices, E = graph.edge_number; 
	var dist = []; 

	// Step 1: Initialize distances from src to all other 
	// vertices as INFINITE 
	for (var i = 0; i < V; ++i){
		dist[i] = max; 
	}
		
	dist[src] = 0; 

	// This is the core formula to realise the Note above
	for (var i = 1; i < V; ++i) { 
		for (var j = 0; j < E; ++j) { 
			var u = graph.edges[j].src; 
			var v = graph.edges[j].dest;
			var weight = graph.edges[j].weight; 
			if (dist[u] != max && dist[u] + weight < dist[v]){
				dist[v] = dist[u] + weight; 
			}
		} 
	} 

	
	//Note: We run the iteration one last time to see if we get a smaller number
	//If yes, then we have a negative cycle
	for (var j = 0; j < E; ++j) { 
		var u = graph.edges[j].src;
		var v = graph.edges[j].dest;
		var weight = graph.edges[j].weight;
		if (dist[u] != max && dist[u] + weight < dist[v]) { 
			console.log("Graph contains negative weight cycle"); 
			return; 
		} 
	}
	printArr(dist, V); 
} 
  
// A utility function used to print the solution 
function printArr(dist, V) 
{ 
	console.log("Vertex Distance from Source"); 
	for (var i = 0; i < V; ++i) 
		console.log(i + "\t\t" + dist[i]); 
}
	
	
var V = 5; // Number of vertices in graph 
var E = 8;

var new_graph = {edges:[],vertices:V,edge_number:E};

new_graph = graph.create.call(new_graph);

// add edge 0-1 (or A-B in above figure) 
new_graph.edges[0].src = 0; 
new_graph.edges[0].dest = 1; 
new_graph.edges[0].weight = -1; 

// add edge 0-2 (or A-C in above figure) 
new_graph.edges[1].src = 0; 
new_graph.edges[1].dest = 2; 
new_graph.edges[1].weight = 4; 

// add edge 1-2 (or B-C in above figure) 
new_graph.edges[2].src = 1; 
new_graph.edges[2].dest = 2; 
new_graph.edges[2].weight = 3; 

// add edge 1-3 (or B-D in above figure) 
new_graph.edges[3].src = 1; 
new_graph.edges[3].dest = 3; 
new_graph.edges[3].weight = 2; 

// add edge 1-4 (or B-E in above figure) 
new_graph.edges[4].src = 1; 
new_graph.edges[4].dest = 4; 
new_graph.edges[4].weight = 2; 

// add edge 3-2 (or D-C in above figure) 
new_graph.edges[5].src = 3; 
new_graph.edges[5].dest = 2; 
new_graph.edges[5].weight = 5; 

// add edge 3-1 (or D-B in above figure) 
new_graph.edges[6].src = 3; 
new_graph.edges[6].dest = 1; 
new_graph.edges[6].weight = 1; 

// add edge 4-3 (or E-D in above figure) 
new_graph.edges[7].src = 4; 
new_graph.edges[7].dest = 3; 
new_graph.edges[7].weight = -3;

BellmanFord(new_graph,1);