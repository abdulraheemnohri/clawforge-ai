// ClawForge Android — Main Activity (Kotlin)
package com.clawforge

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ClawForgeTheme {
                ClawForgeApp()
            }
        }
    }
}

@Composable
fun ClawForgeApp() {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Home", "Chat", "Voice", "Tasks", "Devices")

    Scaffold(
        bottomBar = {
            NavigationBar {
                tabs.forEachIndexed { i, label ->
                    NavigationBarItem(
                        selected = selectedTab == i,
                        onClick = { selectedTab = i },
                        label = { Text(label) },
                        icon = { Text("●") }
                    )
                }
            }
        }
    ) { paddingValues ->
        Box(modifier = Modifier.padding(paddingValues)) {
            when (selectedTab) {
                0 -> HomeScreen()
                1 -> ChatScreen()
                2 -> VoiceScreen()
                3 -> TasksScreen()
                4 -> DevicesScreen()
            }
        }
    }
}

@Composable
fun HomeScreen() {
    Column(modifier = Modifier.padding(16.dp).fillMaxWidth()) {
        Text("ClawForge", style = MaterialTheme.typography.headlineLarge)
        Spacer(Modifier.height(8.dp))
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Windows PC", style = MaterialTheme.typography.titleMedium)
                Text("● Online", color = MaterialTheme.colorScheme.primary)
            }
        }
        Spacer(Modifier.height(8.dp))
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
            FilterChip(onClick = {}, label = { Text("Ask Claw") })
            FilterChip(onClick = {}, label = { Text("Voice") })
        }
        Spacer(Modifier.height(16.dp))
        Text("Recent Tasks", style = MaterialTheme.typography.titleMedium)
    }
}

@Composable
fun ChatScreen() {
    Column(modifier = Modifier.padding(16.dp).fillMaxSize()) {
        Text("Chat", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.weight(1f))
        OutlinedTextField(
            value = "",
            onValueChange = {},
            placeholder = { Text("Message ClawForge...") },
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun VoiceScreen() {
    Column(modifier = Modifier.padding(16.dp).fillMaxWidth()) {
        Text("Voice", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(16.dp))
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(32.dp), horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally) {
                Text("○", style = MaterialTheme.typography.displayLarge)
                Text("Tap to speak", style = MaterialTheme.typography.bodyMedium)
            }
        }
    }
}

@Composable
fun TasksScreen() {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Tasks", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(8.dp))
        Text("No active tasks")
    }
}

@Composable
fun DevicesScreen() {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Devices", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(8.dp))
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Windows PC", style = MaterialTheme.typography.titleMedium)
                Text("● Online", color = MaterialTheme.colorScheme.primary)
            }
        }
        Spacer(Modifier.height(8.dp))
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Pair New Device", style = MaterialTheme.typography.titleMedium)
                Text("Scan QR code to pair", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
